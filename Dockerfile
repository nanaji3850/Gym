FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

COPY gymfluencer_ai.py .

COPY .env .

CMD ["uvicorn", "gymfluencer_ai:app", "--host", "0.0.0.0", "--port", "8000"]
