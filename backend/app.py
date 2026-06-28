from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

FILE_NAME = "students.json"


# Agar students.json exist nahi karti to create kar do
if not os.path.exists(FILE_NAME):
    with open(FILE_NAME, "w") as file:
        json.dump([], file)


@app.route("/")
def home():
    return "Flask Backend Running..."


@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    student = {
        "name": data.get("name"),
        "email": data.get("email"),
        "age": data.get("age"),
        "course": data.get("course")
    }

    # Purana data read karo
    with open(FILE_NAME, "r") as file:
        students = json.load(file)

    # Naya student add karo
    students.append(student)

    # File me save karo
    with open(FILE_NAME, "w") as file:
        json.dump(students, file, indent=4)

    return jsonify({
        "message": "Student Registered Successfully",
        "student": student
    })


@app.route("/students", methods=["GET"])
def get_students():

    with open(FILE_NAME, "r") as file:
        students = json.load(file)

    return jsonify(students)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)