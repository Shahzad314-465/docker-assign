# Python image use karo
FROM python:3.10-slim

# Working directory
WORKDIR /app

# Requirements file copy karo
COPY requirements.txt .

# Packages install karo
RUN pip install --no-cache-dir -r requirements.txt

# Backend ka sara code copy karo
COPY . .

# Flask port expose karo
EXPOSE 5000

# App run karo
CMD ["python", "app.py"]



