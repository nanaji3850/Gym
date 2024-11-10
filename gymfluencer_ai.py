import os
from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from flask_socketio import SocketIO, emit  # Import SocketIO
import cv2
import mediapipe as mp
import math
import numpy as np
import openai  # Import OpenAI
# import base64 
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file
openai.api_key = os.getenv("OPENAI_API_KEY")  # Set the API key from the environment variable

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", ping_interval=25000, ping_timeout=60000)  # Initialize SocketIO
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
# Initialize drawing utility for visualizing pose landmarks
mp_drawing = mp.solutions.drawing_utils

# Define drawing specifications for thicker and clearer pose landmarks
landmark_style = mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=4, circle_radius=3)  # Green color, thick, larger circles
connection_style = mp_drawing.DrawingSpec(color=(0, 255, 255), thickness=3)  # Red color for connections

rep_count = {
    'Push-ups': 0,
    'Squats': 0,
    'Pull-ups': 0,
    'Deadlifts': 0,
    'Bicep Curls': 0  # Added bicep curls
}
stage = None
top_angle=0
down_angle=0
reps_data=""
workout_type = None
workout_started = False
calories_burned = {
    'Push-ups': 0,
    'Squats': 0,
    'Pull-ups': 0,
    'Deadlifts': 0,
    'Bicep Curls': 0  # Added bicep curls
}

CALORIES_PER_REP = {
    'Push-ups': 0.32,
    'Squats': 0.31,
    'Pull-ups': 0.98,
    'Deadlifts': 1.23,
    'Bicep Curls': 0.25  # Added calories per rep for bicep curls
}

angle_ranges = {
    "Push-ups": {"down_angle": "70-100°", "up_angle": "160-180°"},
    "Pull-ups": {"down_angle": "160-180°", "up_angle": "50-90°"},
    "Bicep Curls": {"down_angle": "160-180°", "up_angle": "40-80°"},
    "Squats": {"down_angle": "80-100°", "up_angle": "160-180°"},
    "Deadlifts": {"down_angle": "100-130°", "up_angle": "160-180°"}
}

def generate_workout_plan(fitness_info):
    # Define the tailored prompt for generating the workout plan
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

    # Call to OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=0.6,
        messages=[
            {"role": "system", "content": "You are a fitness expert."},
            {"role": "user", "content": prompt}
        ]
    )

    # Extract the response and return it
    workout_plan = response['choices'][0]['message']['content']
    return workout_plan


def generate_diet_plan(diet_info):
    # Define the tailored prompt for generating the workout plan
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

    # Call to OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=0.6,
        messages=[
            {"role": "system", "content": "You are a fitness expert."},
            {"role": "user", "content": prompt}
        ]
    )

    # Extract the response and return it
    diet_plan = response['choices'][0]['message']['content']
    return diet_plan



# Function to generate workout feedback using OpenAI's API
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


# Function to calculate the angle between three points
def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    radians = math.atan2(c[1] - b[1], c[0] - b[0]) - math.atan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / math.pi)
    if angle > 180.0:
        angle = 360 - angle
    return angle


# Function to count reps based on the workout type and calculating calories burned
def count_reps(landmarks,workout_type,body_weight):
    global rep_count, stage, calories_burned, top_angle , reps_data, down_angle
    
    if workout_type == 'Push-ups':
        left_wrist = landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
        left_elbow = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]
        left_shoulder = landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]

        wrist = [left_wrist.x, left_wrist.y]
        elbow = [left_elbow.x, left_elbow.y]
        shoulder = [left_shoulder.x, left_shoulder.y]

        angle = calculate_angle(wrist, elbow, shoulder)

        if angle > 150:
            top_angle = max(top_angle, angle)
            stage = "up"
            
        elif angle < 80 and stage == 'up':
            rep_count[workout_type] += 1
            stage = "down"
            calories_burned[workout_type] += CALORIES_PER_REP[workout_type] * (body_weight / 70)
            print(f"Rep: {rep_count[workout_type]}, Angle (down): {angle},Angle(up):{top_angle}")
            
            # Add the rep data to reps_data string
            reps_data += f"Rep: {rep_count[workout_type]}, Angle (down): {angle}, Angle (up): {top_angle}\n"
            
            top_angle = 0

            # Generate feedback and emit it to the frontend
        # feedback = generate_workout_feedback(workout_type, reps_data)  # Generate feedback
        # emit('feedback', {'feedback': feedback})  # Emit feedback to frontend

    elif workout_type == 'Squats':
        left_knee = landmarks.landmark[mp_pose.PoseLandmark.LEFT_KNEE]
        left_hip = landmarks.landmark[mp_pose.PoseLandmark.LEFT_HIP]
        left_ankle = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ANKLE]

        knee = [left_knee.x, left_knee.y]
        hip = [left_hip.x, left_hip.y]
        ankle = [left_ankle.x, left_ankle.y]

        angle = calculate_angle(hip, knee, ankle)

        if angle < 90:
            down_angle=min(down_angle,angle)
            stage = "down"
        elif angle > 160 and stage =='down':
            rep_count[workout_type] += 1
            stage="up"
            calories_burned[workout_type] += CALORIES_PER_REP[workout_type] * (body_weight / 70)
            print(f"Rep: {rep_count[workout_type]}, Angle (up): {angle},Angle(down):{down_angle}")
            
            reps_data += f"Rep: {rep_count[workout_type]}, Angle (up): {angle}, Angle (down): {down_angle}\n"
            down_angle=0

    elif workout_type == 'Pull-ups':
        left_wrist = landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
        left_elbow = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]
        left_shoulder = landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]

        wrist = [left_wrist.x, left_wrist.y]
        elbow = [left_elbow.x, left_elbow.y]
        shoulder = [left_shoulder.x, left_shoulder.y]

        angle = calculate_angle(wrist, elbow, shoulder)

        if angle > 160:
            down_angle = max(down_angle, angle)
            stage = "down"
        elif angle < 70 and stage =='down':
            rep_count[workout_type] += 1
            stage="up"
            calories_burned[workout_type] += CALORIES_PER_REP[workout_type] * (body_weight / 70)

            print(f"Rep: {rep_count[workout_type]}, Angle (down): {down_angle},Angle(up):{angle}")
            
            # Add the rep data to reps_data string
            reps_data += f"Rep: {rep_count[workout_type]}, Angle (down): {down_angle}, Angle (up): {angle}\n"
            
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
           

    elif workout_type == 'Bicep Curls':
        left_wrist = landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
        left_elbow = landmarks.landmark[mp_pose.PoseLandmark.LEFT_ELBOW]
        left_shoulder = landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]

        wrist = [left_wrist.x, left_wrist.y]
        elbow = [left_elbow.x, left_elbow.y]
        shoulder = [left_shoulder.x, left_shoulder.y]

        angle = calculate_angle(shoulder, elbow, wrist)  # Use elbow, shoulder, and wrist for curls

        if angle > 160:  # Arm fully extended
            down_angle = max(down_angle, angle)
            stage = "down"
        elif angle < 40 and stage =='down':  # Arm fully flexed
            rep_count[workout_type] += 1
            stage="up"
            calories_burned[workout_type] += CALORIES_PER_REP[workout_type] * (body_weight / 70)

            print(f"Rep: {rep_count[workout_type]}, Angle (down): {down_angle},Angle(up):{angle}")
            
            # Add the rep data to reps_data string
            reps_data += f"Rep: {rep_count[workout_type]}, Angle (down): {down_angle}, Angle (up): {angle}\n"
            
            down_angle = 0
            

# Define a new route to handle user fitness information submission
@app.route('/submit_fitness_info', methods=['POST'])
def submit_fitness_info():
    # Extract data from the POST request
    fitness_info = request.get_json()  # Expecting JSON data from the frontend

    if not fitness_info:
        return jsonify({"error": "No data provided"}), 400

    # Here you can store or process the fitness data
    # For demonstration, we'll just print the data
    # print("Received fitness data:", fitness_info)
    # Generate the workout plan based on fitness_info
    workout_plan = generate_workout_plan(fitness_info)
    print(workout_plan)
    socketio.emit('workout_plan', {'workout_plan': workout_plan})

    # Optionally, you could save this data to a database or perform some other logic

    # Returning a success response
    return jsonify({"message": "Fitness information submitted successfully!"}), 200  

@app.route('/submit_diet_info', methods=['POST'])
def submit_diet_info():
    # Extract data from the POST request
    diet_info = request.get_json()  # Expecting JSON data from the frontend

    if not diet_info:
        return jsonify({"error": "No data provided"}), 400

    # Here you can store or process the fitness data
    # For demonstration, we'll just print the data
    # print("Received fitness data:", fitness_info)
    # Generate the workout plan based on fitness_info
    diet_plan = generate_diet_plan(diet_info)
    print(diet_plan)
    socketio.emit('diet_plan', {'diet_plan': diet_plan})

    # Optionally, you could save this data to a database or perform some other logic

    # Returning a success response
    return jsonify({"message": "Fitness information submitted successfully!"}), 200      

@socketio.on('stop_workout')
def handle_stop_workout():
    global stop_workout_flag
    stop_workout_flag = True


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the file to the uploads folder
    filename = file.filename
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Return the filename for further processing
    return jsonify({"filename": filename}), 200

@socketio.on('start_workout')
def handle_start_workout(data):
    source = data.get('source')
    workout_type = data.get('workout_type')
    body_weight = data.get('body_weight')
    global rep_count, calories_burned, down, workout_started, stop_workout_flag,reps_data
    # (Reset counters and variables here)

    # Reset counters and state variables for a fresh start
    rep_count = {
        'Push-ups': 0,
        'Squats': 0,
        'Pull-ups': 0,
        'Deadlifts': 0,
        'Bicep Curls': 0  # Reset bicep curls count
    }
    calories_burned = {
        'Push-ups': 0,
        'Squats': 0,
        'Pull-ups': 0,
        'Deadlifts': 0,
        'Bicep Curls': 0  # Reset bicep curls count
    }
    down = False
    
    workout_started = False
    stop_workout_flag = False

    
    try:
        if source == "0":
            cap = cv2.VideoCapture(0)
        else:
            filename = data.get('filename')
            file_path = f'./uploads/{filename}'
            print(f"File path for uploaded video: {file_path}")

            if not os.path.exists(file_path):
                print(f"Error: File {file_path} not found.")
                emit('error', {'message': 'File not found'})
                return
          
            cap = cv2.VideoCapture(file_path)
            

        while cap.isOpened() and not stop_workout_flag:
            ret, frame = cap.read()
            if not ret or stop_workout_flag:
                break

            # (Pose processing code here: calculating landmarks, classifying workout, counting reps)
            # Convert the frame to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False

            # Process the image and get pose landmarks
            results = pose.process(image)

            # Convert the image back to BGR for OpenCV
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            # Draw the pose annotations on the image
            if results.pose_landmarks:
                mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,landmark_drawing_spec=landmark_style,
                                          
                                          
                                          connection_drawing_spec=connection_style)

                count_reps(results.pose_landmarks, workout_type,body_weight)

                # Count repetitions based on workout type
                if workout_started:
                    count_reps(results.pose_landmarks, workout_type,body_weight)

            # Display the rep count and workout type on the frame
            cv2.putText(image, f'Workout: {workout_type}', (10, 30), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
            cv2.putText(image, f'Reps:{rep_count[workout_type]}', (10, 60), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)

            
            cv2.putText(image, f'Calories: {calories_burned[workout_type]:.2f}', (10, 90), 
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
            
            # Show the processed image
            cv2.imshow('Workout Counter', image)


            
            # Encode frame and send it to frontend via WebSocket
            _, buffer = cv2.imencode('.jpg', image)
            frame_data = buffer.tobytes()
            emit('frame', frame_data)  # Send frame data to frontend

        # Break the loop on 'q' key press
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

            

        cap.release()
        cv2.destroyAllWindows()

    

        # Generate a summary
        summary = {workout_type: {'reps': rep_count[workout_type], 'calories': calories_burned[workout_type]}}
        
        emit('summary', summary)  # Emit final summary via WebSocket
        feedback = generate_workout_feedback(workout_type, reps_data)  # Generate feedback
        emit('feedback', {'feedback': feedback})  # Emit feedback to frontend

    except Exception as e:
        print(f"Error: {e}")

# Run the SocketIO app
if __name__ == '__main__':
    socketio.run(app, debug=True)