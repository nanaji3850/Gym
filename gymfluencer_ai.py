import os
import re
from fastapi import FastAPI, Request, WebSocket,WebSocketDisconnect, UploadFile, File, HTTPException,Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
from fastapi.security import OAuth2PasswordBearer
import base64 
# import json
import cv2
import mediapipe as mp
import math
import numpy as np
import openai
from dotenv import load_dotenv
# from fastapi_socketio import SocketManager
import jwt
from passlib.context import CryptContext
from typing import List
# import socketio
import asyncio
from pymongo import MongoClient
from datetime import datetime, timedelta
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime, timedelta
import uuid
from pydantic import BaseModel
import bcrypt


load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()
# socket_manager = SocketManager(app)

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT secret key and algorithm
SECRET_KEY = os.getenv("SECRET_KEY", "mysecretkey")  # Use a more secure key in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Signup and login functions
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=15)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Signup endpoint
@app.post("/signup")
async def signup(request: Request):
    data = await request.json()
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        raise HTTPException(status_code=400, detail="Username and password are required")

    # Check if user already exists
    if users_collection.find_one({"username": username}):
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = get_password_hash(password)
    
    # Save user to the database
    users_collection.insert_one({"username": username, "password": hashed_password})
    
    return JSONResponse({"message": "User created successfully"}, status_code=201)

# Login endpoint
@app.post("/login")
async def login(request: Request):
    data = await request.json()
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        raise HTTPException(status_code=400, detail="Username and password are required")
    
    user = users_collection.find_one({"username": username})
    
    if not user or not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    # Create JWT token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": username}, expires_delta=access_token_expires)
    
    return JSONResponse({"access_token": access_token, "token_type": "bearer"})

class ForgotPasswordRequest(BaseModel):
    username: str

@app.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    username = request.username
    print(username)
    
    # Find user by username
    user = users_collection.find_one({"username": username})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Username found. You can reset your password now."}
    
def hash_password(password: str) -> str:
    # Generate a salt
    salt = bcrypt.gensalt()
    # Hash the password with the generated salt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    # Return the hashed password (convert it to string for storage in DB)
    return hashed_password.decode('utf-8')
class ResetPasswordRequest(BaseModel):
    username: str
    new_password: str

@app.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    username = request.username
    new_password = request.new_password

    # Find the user by username
    user = users_collection.find_one({"username": username})

    if not user:
        raise HTTPException(status_code=404, detail="Username not found.")

    # Hash the new password
    hashed_password = hash_password(new_password)

    # Update the password in the database
    users_collection.update_one(
        {"username": username},
        {"$set": {"password": hashed_password}}
    )

    return {"message": "Password successfully reset"}
# Protect routes with JWT authentication
def get_current_user(token: str = Depends(OAuth2PasswordBearer)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except jwt.PyJWTError:
        raise credentials_exception

# Example protected route (requires authentication)
@app.get("/protected")
async def protected_route(current_user: str = Depends(get_current_user)):
    return {"message": f"Welcome {current_user}, you are authorized to access this route."}


UPLOAD_FOLDER = './uploads'
absolute_path = os.path.abspath(UPLOAD_FOLDER)
print(f"Absolute path for uploads directory: {absolute_path}")
# Ensure the uploads directory exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)



# Store connected WebSocket clients
active_connections = []
# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

landmark_style = mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=4, circle_radius=3)
connection_style = mp_drawing.DrawingSpec(color=(0, 255, 255), thickness=3)

rep_count = {
    'Push-ups': 0,
    'Squats': 0,
    'Pull-ups': 0,
    'Deadlifts': 0,
    'Bicep Curls': 0
}
stage = None
top_angle = 0
down_angle = 0
reps_data = ""
workout_type = None
workout_task = None
workout_started = False
stop_workout_flag = False
calories_burned = {
    'Push-ups': 0,
    'Squats': 0,
    'Pull-ups': 0,
    'Deadlifts': 0,
    'Bicep Curls': 0
}

CALORIES_PER_REP = {
    'Push-ups': 0.32,
    'Squats': 0.31,
    'Pull-ups': 0.98,
    'Deadlifts': 1.23,
    'Bicep Curls': 0.25
}

angle_ranges = {
    "Push-ups": {"down_angle": "70-100°", "up_angle": "160-180°"},
    "Pull-ups": {"down_angle": "160-180°", "up_angle": "50-90°"},
    "Bicep Curls": {"down_angle": "160-180°", "up_angle": "40-80°"},
    "Squats": {"down_angle": "80-100°", "up_angle": "160-180°"},
    "Deadlifts": {"down_angle": "100-130°", "up_angle": "160-180°"}
}

def generate_workout_plan(fitness_info):
    prompt = f"""
    Create a personalized weekly workout plan based on the following user information:
    
    - Goals: {fitness_info.get('goals')}
    - Focus Areas: {fitness_info.get('focusAreas')}
    - Fitness Level: {fitness_info.get('fitnessLevel')}
    - Exercise Experience: {fitness_info.get('exerciseExperience')}
    - Age: {fitness_info.get('age')}
    - Height: {fitness_info.get('height')}
    - Weight: {fitness_info.get('weight')}
    - Injuries: {fitness_info.get('injuries')}
    - Medical Conditions: {fitness_info.get('medicalConditions')}
    - Preferred Workout Types: {fitness_info.get('workoutTypes')}
    - Days Available: {', '.join(fitness_info.get('daysAvailable'))}
    
    Please structure the workout plan in a clear, easily readable format with simple headings for each day. Use bullet points and concise text to make each section (Warm-Up, Main Workout, Cool-Down) stand out for easy understanding. Ensure it appears formatted for readability directly.
    
    Use the following structure for each day:
    
    Day X: [Workout Focus]
    - **Warm-Up**: Briefly list exercises
    - **Main Workout**: Bullet points with each exercise, sets, and reps
    - **Cool-Down**: Bullet points with stretches and duration

    Make sure the final output is formatted and styled in a clear, instructional way, as if for direct frontend display.
    """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=0.6,
        messages=[
            {"role": "system", "content": "You are a fitness expert."},
            {"role": "user", "content": prompt}
        ]
    )

    workout_plan = response['choices'][0]['message']['content']
    return workout_plan

def generate_diet_plan(diet_info):
    prompt = f"""
    Create a personalized weekly Diet plan based on the following user information:
    
    - age: {diet_info.get('age')}
    - gender: {diet_info.get('gender')}
    - height: {diet_info.get('height')}
    - weight: {diet_info.get('weight')}
    - activityLevel: {diet_info.get('activityLevel')}
    - goal: {diet_info.get('goal')}
    - specificGoal: {diet_info.get('specificGoal')}
    - dietType: {diet_info.get('dietType')}
    - allergies: {diet_info.get('allergies')}
    - dislikes: {diet_info.get('dislikes')}
    - medicalConditions: {diet_info.get('medicalConditions')}
    - nutritionalNeeds: {diet_info.get('nutritionalNeeds')}
    - mealsPerDay: {diet_info.get('mealsPerDay')}
    - cookingHabits: {diet_info.get('cookingHabits')}
    - budget: {diet_info.get('budget')}
    - dailyDiet: {diet_info.get('dailyDiet')}
    - eatingOutFrequency: {diet_info.get('eatingOutFrequency')}
    
    Please structure the Diet plan in a clear, easily readable format with simple headings for each day. Use bullet points and concise text to make each section (Breakfast, Lunch, Dinner) stand out for easy understanding. Ensure it appears formatted for readability directly.
    
    Use the following structure for each day:
    
    Day X: [Diet Focus]
    - **Breakfast**: Suggested foods to support [Diet Focus]
    - **Lunch**: Nutrient-rich meal options aligned with [Diet Focus]
    - **Dinner**: Light, balanced meal ideas with relaxation or recovery emphasis

    Make sure the final output is formatted and styled in a clear, instructional way, as if for direct frontend display.
    """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=0.6,
        messages=[
            {"role": "system", "content": "You are a fitness expert."},
            {"role": "user", "content": prompt}
        ]
    )

    diet_plan = response['choices'][0]['message']['content']
    return diet_plan

def generate_workout_feedback(workout_name, reps_data):
    if workout_name in angle_ranges:
        down_angle_range = angle_ranges[workout_name]["down_angle"]
        up_angle_range = angle_ranges[workout_name]["up_angle"]
    else:
        return "Workout type not recognized."
    
    prompt = f"""
    You are a professional personal trainer with a focus on biomechanics. 
    Based on the workout data provided below, provide a concise assessment of the user's form and give short, 
    actionable tips for improving their technique.

    Instructions:
    
    Workout: {workout_name}
    
    Reps and Angle Data:
    {reps_data}

    Detailed Feedback and Improvement Suggestions:
    1. For each rep, check if the down angle is within the {down_angle_range} range and the up angle is within the {up_angle_range} range.
    2. Provide feedback if the angles are outside these ranges.
    3. Suggest improvements if the form is incorrect, focusing on adjustments for maintaining the correct angle range.
    4. If the form is correct, affirm that the rep is well-executed and suggest any tips for optimizing the workout.
    """
   
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300,
        temperature=0.6
    )

    feedback = response.choices[0].message['content'].strip()
    return feedback

def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    radians = math.atan2(c[1] - b[1], c[0] - b[0]) - math.atan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / math.pi)
    if angle > 180.0:
        angle = 360 - angle
    return angle

def count_reps(landmarks, workout_type, body_weight):
    global rep_count, stage, calories_burned, top_angle, reps_data, down_angle
    
    if workout_type == 'Push-ups':
        left_wrist = landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
        left_elbow = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]
        left_shoulder = landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
        
        wrist = [left_wrist.x, left_wrist.y]
        elbow = [left_elbow.x, left_elbow.y]
        shoulder = [left_shoulder.x, left_shoulder.y]
        
        left_angle = calculate_angle(wrist, elbow, shoulder)

        right_wrist = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST]
        right_elbow = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ELBOW]
        right_shoulder = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
        
        wrist = [right_wrist.x, right_wrist.y]
        elbow = [right_elbow.x, right_elbow.y]
        shoulder = [right_shoulder.x, right_shoulder.y]
        
        right_angle = calculate_angle(wrist, elbow, shoulder)

        if left_angle > 150 and right_angle > 150:
            top_angle = max(top_angle, left_angle, right_angle)
            stage = "up"
            
        elif left_angle < 80 and right_angle < 80 and stage == 'up':
            rep_count[workout_type] += 1
            stage = "down"
            calories_burned[workout_type] += CALORIES_PER_REP[workout_type] * (body_weight / 70)
            # print(f"Rep: {rep_count[workout_type]}, Left Angle (down): {left_angle}, Right Angle (down): {right_angle}, Angle(up): {top_angle}")
            
            reps_data += f"Rep: {rep_count[workout_type]}, Left Angle (down): {left_angle}, Right Angle (down): {right_angle}, Angle (up): {top_angle}\n"
            
            top_angle = 0

    elif workout_type == 'Squats':
        left_knee = landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE]
        left_hip = landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
        left_ankle = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE]

        knee = [left_knee.x, left_knee.y]
        hip = [left_hip.x, left_hip.y]
        ankle = [left_ankle.x, left_ankle.y]

        left_angle = calculate_angle(hip, knee, ankle)

        right_knee = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE]
        right_hip = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP]
        right_ankle = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ANKLE]

        knee = [right_knee.x, right_knee.y]
        hip = [right_hip.x, right_hip.y]
        ankle = [right_ankle.x, right_ankle.y]

        right_angle = calculate_angle(hip, knee, ankle)

        if left_angle < 90 and right_angle < 90:
            down_angle = min(down_angle, left_angle, right_angle)
            stage = "down"
        elif left_angle > 160 and right_angle > 160 and stage == 'down':
            rep_count[workout_type] += 1
            stage = "up"
            calories_burned[workout_type] += CALORIES_PER_REP[workout_type] * (body_weight / 70)
            print(f"Rep: {rep_count[workout_type]}, Left Angle (up): {left_angle}, Right Angle (up): {right_angle}, Angle(down): {down_angle}")
            
            reps_data += f"Rep: {rep_count[workout_type]}, Left Angle (up): {left_angle}, Right Angle (up): {right_angle}, Angle (down): {down_angle}\n"
            
            down_angle = 0

    elif workout_type == 'Pull-ups':
        left_wrist = landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
        left_elbow = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]
        left_shoulder = landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]

        wrist = [left_wrist.x, left_wrist.y]
        elbow = [left_elbow.x, left_elbow.y]
        shoulder = [left_shoulder.x, left_shoulder.y]

        left_angle = calculate_angle(wrist, elbow, shoulder)

        right_wrist = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST]
        right_elbow = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ELBOW]
        right_shoulder = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]

        wrist = [right_wrist.x, right_wrist.y]
        elbow = [right_elbow.x, right_elbow.y]
        shoulder = [right_shoulder.x, right_shoulder.y]

        right_angle = calculate_angle(wrist, elbow, shoulder)

        if left_angle > 160 and right_angle > 160:
            down_angle = max(down_angle, left_angle, right_angle)
            stage = "down"
        elif left_angle < 70 and right_angle < 70 and stage == 'down':
            rep_count[workout_type] += 1
            stage = "up"
            calories_burned[workout_type] += CALORIES_PER_REP[workout_type] * (body_weight / 70)

            print(f"Rep: {rep_count[workout_type]}, Left Angle (down): {down_angle}, Right Angle (down): {down_angle}, Angle(up): {left_angle}")
            
            reps_data += f"Rep: {rep_count[workout_type]}, Left Angle (down): {down_angle}, Right Angle (down): {down_angle}, Angle (up): {left_angle}\n"
            
            down_angle = 0

    elif workout_type == 'Deadlifts':
        # Left side landmarks
        left_hip = [landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP.value].x,
                    landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP.value].y]
        left_knee = [landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                    landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
        left_ankle = [landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                    landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]
        left_angle = calculate_angle(left_hip, left_knee, left_ankle)

        # Right side landmarks
        right_hip = [landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP.value].x,
                    landmarks.landmark[mp_pose.PoseLandmark.RIGHT_HIP.value].y]
        right_knee = [landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE.value].x,
                    landmarks.landmark[mp_pose.PoseLandmark.RIGHT_KNEE.value].y]
        right_ankle = [landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ANKLE.value].x,
                    landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ANKLE.value].y]
        right_angle = calculate_angle(right_hip, right_knee, right_ankle)

        # Use the minimum angle for consistency
        angle = min(left_angle, right_angle)

        # Check stages and count repetitions
        if angle > 170:
            down_angle = max(down_angle, angle)
            stage = "down"
        elif angle < 145 and stage == 'down':
            rep_count[workout_type] += 1
            stage = "up"
            calories_burned[workout_type] += CALORIES_PER_REP[workout_type] * (body_weight / 70)

            print(f"Rep: {rep_count[workout_type]}, Angle (down): {down_angle}, Angle (up): {angle}")

            reps_data += f"Rep: {rep_count[workout_type]}, Angle (down): {down_angle}, Angle (up): {angle}\n"

            down_angle = 0


    elif workout_type == 'Bicep Curls':
        left_wrist = landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
        left_elbow = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]
        left_shoulder = landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]

        right_wrist = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST]
        right_elbow = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_ELBOW]
        right_shoulder = landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]

        left_wrist_coord = [left_wrist.x, left_wrist.y]
        left_elbow_coord = [left_elbow.x, left_elbow.y]
        left_shoulder_coord = [left_shoulder.x, left_shoulder.y]
        left_angle = calculate_angle(left_shoulder_coord, left_elbow_coord, left_wrist_coord)

        right_wrist_coord = [right_wrist.x, right_wrist.y]
        right_elbow_coord = [right_elbow.x, right_elbow.y]
        right_shoulder_coord = [right_shoulder.x, right_shoulder.y]
        right_angle = calculate_angle(right_shoulder_coord, right_elbow_coord, right_wrist_coord)

        angle = min(left_angle, right_angle)

        if angle > 160:
            down_angle = max(down_angle, angle)
            stage = "down"
        elif angle < 40 and stage == 'down':
            rep_count[workout_type] += 1
            stage = "up"
            calories_burned[workout_type] += CALORIES_PER_REP[workout_type] * (body_weight / 70)

            print(f"Rep: {rep_count[workout_type]}, Angle (down): {down_angle}, Angle(up): {angle}")

            reps_data += f"Rep: {rep_count[workout_type]}, Angle (down): {down_angle}, Angle (up): {angle}\n"

            down_angle = 0



# MongoDB setup
MONGO_URI = "mongodb+srv://naninani38502886:mT67vL5t7b2CbPQY@cluster0.yokp6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 
client = MongoClient(MONGO_URI)
db = client["gymfluencer"]
users_collection = db["users"]


# Fetch aggregated workout data
@app.get("/api/get-aggregated-data")
async def get_aggregated_data(user_id: str):
    try:
        pipeline = [
            {"$match": {"user_id": user_id}},  # Filter for the specific user
            {"$unwind": "$workouts"},  # Flatten the workouts array
            {
                "$group": {
                    "_id": "$workouts.workout_type",  # Group by workout type
                    "total_reps": {"$sum": "$workouts.reps"},  # Sum reps
                    "total_calories": {"$sum": "$workouts.calories_burned"}  # Sum calories burned
                }
            },
            {
                "$project": {
                    "_id": 0,  # Exclude the default MongoDB ID
                    "workout_type": "$_id",  # Rename _id to workout_type
                    "total_reps": 1,
                    "total_calories": 1
                }
            }
        ]
        result = list(users_collection.aggregate(pipeline))
        return JSONResponse(content={"data": result})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


# Fetch user's diet plans
@app.get("/api/user/diet-plans")
async def get_diet_plans(user_id: str):
    try:
        user = users_collection.find_one({"user_id": user_id}, {"_id": 0, "diet_plan": 1})
        if user:
            return JSONResponse(content={"diet_plans": user.get("diet_plan", [])})
        return JSONResponse(content={"diet_plans": []})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Fetch user's workout plans
@app.get("/api/user/workout-plans")
async def get_workout_plans(user_id: str):
    try:
        
        user = users_collection.find_one({"user_id": user_id}, {"_id": 0, "workout_plans": 1})
        if user:
            return JSONResponse(content={"workout_plans": user.get("workout_plans", [])})
        return JSONResponse(content={"workout_plans": []})  # Return empty list if no user found
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Save user workout data
def save_workout_data(user_id, workout_data):
    try:
        users_collection.update_one(
            {"user_id": user_id},
            {"$push": {"workouts": workout_data}},
            upsert=True
        )
        print("Workout data saved successfully.")
    except Exception as e:
        print(f"Error saving workout data: {e}")

# Save diet plan
def save_diet_plan(user_id, diet_plan):
    try:
        # Check if the user document exists
        user = users_collection.find_one({"user_id": user_id})

        if user:
            # Ensure workout_plans is an array
            if not isinstance(user.get("workout_plans"), list):
                # If it's not an array, convert the current value to an array
                users_collection.update_one(
                    {"user_id": user_id},
                    {"$set": {"diet_plan": [user["diet_plan"]]}}  # Make the existing value an array
                )
        else:
            # If no user document exists, create one with an empty workout_plans array
            users_collection.insert_one({"user_id": user_id, "diet_plan": []})
        users_collection.update_one(
            {"user_id": user_id},
            {"$push": {"diet_plan": diet_plan}},
            upsert=True
        )
        print("Diet plan saved successfully.")
        return JSONResponse(content={"diet_plans": user.get("diet_plan", [])})
    except Exception as e:
        print(f"Error saving diet plan: {e}")

# Save workout plan
def save_workout_plan(user_id, workout_plan):
    try:
        # Check if the user document exists
        user = users_collection.find_one({"user_id": user_id})
        print(user_id)

        if user:
            # Ensure workout_plans is an array
            if not isinstance(user.get("workout_plans"), list):
                # If it's not an array, convert the current value to an array
                users_collection.update_one(
                    {"user_id": user_id},
                    {"$set": {"workout_plans": [user["workout_plan"]]}}  # Make the existing value an array
                )
        else:
            # If no user document exists, create one with an empty workout_plans array
            users_collection.insert_one({"user_id": user_id, "workout_plans": []})
           

        users_collection.update_one(
            {"user_id": user_id},
            {"$push": {"workout_plans": workout_plan}},
            upsert=True
        )
        print("Workout plan saved successfully.")
    except Exception as e:
        print(f"Error saving workout plan: {e}")

# Example route for saving a workout
@app.post("/save-workout")
async def save_workout(request: Request):
    try:
        data = await request.json()
        user_id = data.get("user_id")
        workout_data = {
            "workout_type": data.get("workout_type"),
            "reps": data.get("reps"),
            "calories_burned": data.get("calories_burned"),
            "timestamp": datetime.utcnow()
        }
        save_workout_data(user_id, workout_data)
        return JSONResponse(content={"message": "Workout data saved successfully."})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Example route for saving plans
@app.post("/save-diet-plan")
async def save_diet(request: Request):
    try:
        data = await request.json()
        user_id = data.get("user_id")
        diet_plan = data.get("diet_plan")
        save_diet_plan(user_id, diet_plan)
        return JSONResponse(content={"message": "Diet plan saved successfully."})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/save-workout-plan")
async def save_plan(request: Request):
    try:
        data = await request.json()
        user_id = data.get("user_id")
        workout_plan = data.get("workout_plan")
        save_workout_plan(user_id, workout_plan)
        return JSONResponse(content={"message": "Workout plan saved successfully."})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/submit_contact_form")
async def submit_contact_form(request: Request):
    form_data = await request.json()

    # Validate the form data
    if not form_data.get("name") or not form_data.get("email") or not form_data.get("message"):
        raise HTTPException(status_code=400, detail="All fields are required")

    # Simulate processing the data (e.g., save to database, send email)
    print(f"Received contact form submission: {form_data}")

    return JSONResponse(content={"message": "Your message has been received. We'll get back to you shortly!"})

@app.post("/submit_fitness_info")
async def submit_fitness_info(request: Request):
    fitness_info = await request.json()

    if not fitness_info:
        raise HTTPException(status_code=400, detail="No data provided")
    
    workout_plan = generate_workout_plan(fitness_info)
    print(workout_plan)

    # Prepare payload for /save-workout-plan
    user_id = fitness_info.get("username")  # Use "default_user" if no user_id provided
    payload = {"user_id": user_id, "workout_plan": workout_plan}

        # Make an internal HTTP call to /save-workout-plan
    async with httpx.AsyncClient() as client:
        response = await client.post("http://34.229.143.21:8000/save-workout-plan", json=payload)

     # Parse response from /save-workout-plan
    if response.status_code == 200:
        save_message = response.json().get("message")
    else:
        save_message = response.json().get("error", "Unknown error")
    
    return JSONResponse(content={"message": "Fitness information submitted successfully!","workout_plan": workout_plan, "save_status": save_message})

@app.post("/submit_diet_info")
async def submit_diet_info(request: Request):
    diet_info = await request.json()

    if not diet_info:
        raise HTTPException(status_code=400, detail="No data provided")

    diet_plan = generate_diet_plan(diet_info)
    print(diet_plan)

    user_id = diet_info.get("username")  # Use "default_user" if no user_id provided
    payload = {"user_id": user_id, "diet_plan": diet_plan}

        # Make an internal HTTP call to /save-workout-plan
    async with httpx.AsyncClient() as client:
        response = await client.post("http://34.229.143.21:8000/save-diet-plan", json=payload)

     # Parse response from /save-workout-plan
    if response.status_code == 200:
        save_message = response.json().get("message")
    else:
        save_message = response.json().get("error", "Unknown error")
    
    return JSONResponse(content={"message": "Diet information submitted successfully!","diet_plan": diet_plan,"save_status": save_message})

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file part")
    
    # Sanitize filename to avoid illegal characters on Windows
    file.filename = re.sub(r'[<>:"/\\|?*]', '_', file.filename)

    file_path = os.path.join(absolute_path, file.filename)
    try:
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        return JSONResponse(content={"filename": file.filename})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    global workout_task,stop_workout_flag
    await websocket.accept()
    while True:
        try:
            data = await websocket.receive_json()
            action = data.get("action")
            workout_type=data.get("workout_type")
            username=data.get("username")
            print(f"Received action: {action}")
            

            if action == "start_workout":
                
                # Launch `handle_start_workout` as a background task
                stop_workout_flag = False  # Reset the stop flag
                workout_task = asyncio.create_task(handle_start_workout(websocket, data))

            elif action == "video_frame":
                # if stop_workout_flag:
                #     # Ignore frames if the workout is stopped
                #     continue
                await handle_video_frame(websocket)

            elif action == "stop_workout":
                
                
                await handle_stop_workout(websocket,workout_type,username)  # Stop the workout immediately

        except WebSocketDisconnect:
            print("Client disconnected")
            break

        

def resize_frame_adaptively(frame, target_width=640, target_height=480):
    """Resize frame while maintaining aspect ratio, only if necessary."""
    original_height, original_width = frame.shape[:2]

    # Check if resizing is needed
    if original_width <= target_width and original_height <= target_height:
        # No resizing needed
        return frame

    # Calculate aspect ratio
    aspect_ratio = original_width / original_height

    # Resize frame while maintaining aspect ratio
    if aspect_ratio > 1:  # Wider than tall
        new_width = target_width
        new_height = int(new_width / aspect_ratio)
    else:  # Taller than wide
        new_height = target_height
        new_width = int(new_height * aspect_ratio)

    resized_frame = cv2.resize(frame, (new_width, new_height))
    return resized_frame    

async def handle_start_workout(websocket: WebSocket, data: dict):
    global rep_count, calories_burned, workout_started, stop_workout_flag, reps_data
    rep_count = {
        'Push-ups': 0,
        'Squats': 0,
        'Pull-ups': 0,
        'Deadlifts': 0,
        'Bicep Curls': 0
    }
    calories_burned = {
        'Push-ups': 0,
        'Squats': 0,
        'Pull-ups': 0,
        'Deadlifts': 0,
        'Bicep Curls': 0
    }
    workout_started = False
    stop_workout_flag = False

    try:
        # Extract workout details
        source = data.get('source')
        workout_type = data.get('workout_type')
        body_weight = data.get('body_weight')

        
        if source == "0":
            cap = cv2.VideoCapture(0)
        else:
            filename = data.get('filename')
            file_path = f'./uploads/{filename}'
            print(f"File path for uploaded video: {file_path}")

            if not os.path.exists(file_path):
                print(f"Error: File {file_path} not found.")
                websocket.send_json({'message': 'File not found'})
                return

            cap = cv2.VideoCapture(file_path)
        previous_frame = None
        frame_count = 0

        # frame_skip =5
        # frame_count=0

        while cap.isOpened() and not stop_workout_flag:
            ret, frame = cap.read()
            if not ret:
                break

            # Resize frame to reduce computational load
            # frame = cv2.resize(frame, (640, 480))
            frame = resize_frame_adaptively(frame, target_width=640, target_height=480)
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            gray_frame = cv2.GaussianBlur(gray_frame, (5, 5), 0)

        # Motion detection logic
            if previous_frame is None:
                previous_frame = gray_frame
                continue

            # Calculate frame difference
            frame_diff = cv2.absdiff(previous_frame, gray_frame)
            _, motion_mask = cv2.threshold(frame_diff, 25, 255, cv2.THRESH_BINARY)
            motion_score = np.sum(motion_mask) / motion_mask.size

            # Update the previous frame
            previous_frame = gray_frame

            # Skip frames if motion is minimal
            if motion_score < 0.01:  # Adjust threshold based on testing
                continue
            
            # frame_count += 1
            # if frame_count % 2 != 0:
            #     continue  # Skip this frame

            # frame = cv2.resize(frame, (680,480))
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            if results.pose_landmarks:
                mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS, landmark_drawing_spec=landmark_style, connection_drawing_spec=connection_style)
                count_reps(results.pose_landmarks, workout_type, body_weight)

            cv2.putText(image, f'Workout: {workout_type}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
            cv2.putText(image, f'Reps:{rep_count[workout_type]}', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
            cv2.putText(image, f'Calories: {calories_burned[workout_type]:.2f}', (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)

            _, buffer = cv2.imencode('.jpg', image)
            frame_data = buffer.tobytes()
            await websocket.send_bytes(frame_data)

            # Brief pause to allow control flow back to event loop
            # await asyncio.sleep(0.05)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

        if source != "0":
            os.remove(file_path)
            print(f"Deleted file: {file_path}")

        
        user_id = data.get("username")  # Use "default_user" if no user_id provided
        payload = {"user_id": user_id, "workout_type":workout_type,"reps":rep_count[workout_type], "calories_burned":calories_burned[workout_type]}
        
        # Make an internal HTTP call to /save-workout-plan
        async with httpx.AsyncClient() as client:
            response = await client.post("http://34.229.143.21:8000/save-workout", json=payload)

        summary = {workout_type: {'reps': rep_count[workout_type], 'calories': calories_burned[workout_type]}}
       
        await websocket.send_json({'summary': summary})

        feedback = generate_workout_feedback(workout_type, reps_data)
       
        await websocket.send_json({'feedback': feedback})
        rep_count = {
             
            'Push-ups': 0,
            'Squats': 0,
            'Pull-ups': 0,
            'Deadlifts': 0,
            'Bicep Curls': 0
        }
        calories_burned = {
            'Push-ups': 0,
            'Squats': 0,
            'Pull-ups': 0,
            'Deadlifts': 0,
            'Bicep Curls': 0
        }

    except Exception as e:
        print(f"Error: {e}")

async def handle_stop_workout(websocket: WebSocket,workout_type,username):

    global stop_workout_flag
    global rep_count, calories_burned, workout_started, stop_workout_flag, reps_data,workout_task
    stop_workout_flag = True
    if workout_task:
        await workout_task  # Wait for the workout task to complete if running
        workout_task = None
    
    user_id = username  # Use "default_user" if no user_id provided
    payload = {"user_id": user_id, "workout_type":workout_type,"reps":rep_count[workout_type], "calories_burned":calories_burned[workout_type]}
        
        # Make an internal HTTP call to /save-workout-plan
    async with httpx.AsyncClient() as client:
        response = await client.post("http://34.229.143.21:8000/save-workout", json=payload)

    feedback = generate_workout_feedback(workout_type, reps_data)
       
    await websocket.send_json({'feedback': feedback})
    # Reset repetition count and calories
    rep_count = {
        'Push-ups': 0,
        'Squats': 0,
        'Pull-ups': 0,
        'Deadlifts': 0,
        'Bicep Curls': 0
    }
    calories_burned = {
        'Push-ups': 0,
        'Squats': 0,
        'Pull-ups': 0,
        'Deadlifts': 0,
        'Bicep Curls': 0
    }
    reps_data=""
    
    await websocket.send_json({"message": "Workout stopped"})

    
    # @app.websocket("/ws/video_frame")
async def handle_video_frame(websocket: WebSocket):
    
    try:
        while True:

            # Receive frame data from the client
            data = await websocket.receive_json()
            
            frame_data = base64.b64decode(data['frame'])
            np_arr = np.frombuffer(frame_data, np.uint8)
            frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

            workout_type = data['workout_type']
            body_weight = data['body_weight']

            # Process the frame
            processed_frame = await process_frame(websocket,frame, workout_type, body_weight)

            
    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"Error: {e}")



async def process_frame(websocket: WebSocket,frame, workout_type, body_weight):
    
    # Example processing code
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False

    # Process the image and get pose landmarks
    results = pose.process(image)

    # Convert the image back to BGR for OpenCV
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # Draw the pose annotations on the image
    if results.pose_landmarks:
        mp_drawing.draw_landmarks(
            image, 
            results.pose_landmarks, 
            mp_pose.POSE_CONNECTIONS,
            landmark_drawing_spec=landmark_style,
            connection_drawing_spec=connection_style
        )

        # Count repetitions and calories
        count_reps(results.pose_landmarks, workout_type, body_weight)
        

        # Display workout details
        cv2.putText(image, f'Workout: {workout_type}', (10, 30), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.putText(image, f'Reps: {rep_count[workout_type]}', (10, 60), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.putText(image, f'Calories: {calories_burned[workout_type]:.2f}', (10, 90), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.imshow('Workout Counter', image)
        _, buffer = cv2.imencode('.jpg', image)
        frame_data = base64.b64encode(buffer).decode('utf-8')
        # logging.info(f"Sending frame data to the client: {len(frame_data)} bytes")
            # Send the processed frame back to the client

        await websocket.send_json({'frame': frame_data})
    
     # Generate and send a summary
    summary = {
        workout_type: {
            "reps": rep_count[workout_type],
            "calories": calories_burned[workout_type]
        }
     }
    
    # logging.info(f"Sending summary data: {summary}")
    await websocket.send_json({"summary": summary})
    return image



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)