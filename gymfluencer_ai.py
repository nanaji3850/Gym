import os
import re
from fastapi import FastAPI, Request, WebSocket,WebSocketDisconnect, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
# import json
import cv2
import mediapipe as mp
import math
import numpy as np
import openai
from dotenv import load_dotenv
# from fastapi_socketio import SocketManager
from typing import List
# import socketio
import asyncio

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()
# socket_manager = SocketManager(app)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        hip = [landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP.value].x,
            landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP.value].y]
        knee = [landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
        ankle = [landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

        angle = calculate_angle(hip, knee, ankle)

        if angle > 170:
            stage = "down"
        elif angle < 145 and stage =='down':
            rep_count[workout_type] += 1
            stage="up"
            calories_burned[workout_type] += CALORIES_PER_REP[workout_type] * (body_weight / 70)

            print(f"Rep: {rep_count[workout_type]}, Angle (down): {down_angle},Angle(up):{angle}")
            
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
    
    return JSONResponse(content={"message": "Fitness information submitted successfully!","workout_plan": workout_plan})

@app.post("/submit_diet_info")
async def submit_diet_info(request: Request):
    diet_info = await request.json()

    if not diet_info:
        raise HTTPException(status_code=400, detail="No data provided")

    diet_plan = generate_diet_plan(diet_info)
    print(diet_plan)
    
    return JSONResponse(content={"message": "Diet information submitted successfully!","diet_plan": diet_plan})

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
            print(f"Received action: {action}")

            if action == "start_workout":
                # Launch `handle_start_workout` as a background task
                stop_workout_flag = False  # Reset the stop flag
                workout_task = asyncio.create_task(handle_start_workout(websocket, data))
            elif action == "stop_workout":
                await handle_stop_workout(websocket)  # Stop the workout immediately

        except WebSocketDisconnect:
            print("Client disconnected")
            break
        

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

        while cap.isOpened() and not stop_workout_flag:
            ret, frame = cap.read()
            if not ret:
                break

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
            await asyncio.sleep(0.1)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

        if source != "0":
            os.remove(file_path)
            print(f"Deleted file: {file_path}")

        summary = {workout_type: {'reps': rep_count[workout_type], 'calories': calories_burned[workout_type]}}
       
        await websocket.send_json({'summary': summary})

        feedback = generate_workout_feedback(workout_type, reps_data)
       
        await websocket.send_json({'feedback': feedback})

    except Exception as e:
        print(f"Error: {e}")

async def handle_stop_workout(websocket: WebSocket):

    global stop_workout_flag
    global rep_count, calories_burned, workout_started, stop_workout_flag, reps_data,workout_task,workout_type
    stop_workout_flag = True
    if workout_task:
        await workout_task  # Wait for the workout task to complete if running
        workout_task = None
    await websocket.send_json({"message": "Workout stopped"})
    print(f"workout_type: {workout_type}")
    print(f"rep_count: {rep_count}")
    print(f"calories_burned: {calories_burned}")


    # # Check if workout_type is set to avoid KeyError
    # if workout_type and workout_type in rep_count and workout_type in calories_burned:
    #     summary = {workout_type: {'reps': rep_count[workout_type], 'calories': calories_burned[workout_type]}}
    # else:
    #     summary = {"message": "No workout data available"}  # Fallback summary

    # feedback = generate_workout_feedback(workout_type, reps_data) if workout_type else "No feedback available"
    # await websocket.send_json({'summary': summary, 'feedback': feedback})

    # Send a confirmation message to the client that the workout has stopped
    


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)