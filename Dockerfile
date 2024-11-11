# Use the Python 3.11.0 slim image as the base image
FROM python:3.11.0-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies (make sure you have a requirements.txt file in your project directory)
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your app will run on (adjust if it's different)
EXPOSE 8000

# Define the command to run your application
CMD ["python", "gymfluencer_ai.py"]
