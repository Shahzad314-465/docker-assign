const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

// Form ka data read karne ke liye
app.use(express.urlencoded({ extended: true }));

// JSON data read karne ke liye
app.use(express.json());

// EJS template engine set karna
app.set("view engine", "ejs");

// Docker me backend ka URL
const BACKEND_URL =
  process.env.BACKEND_URL || "http://localhost:5000";

// Home Page
app.get("/", (req, res) => {
  res.render("index");
});

// Form Submit
app.post("/register", async (req, res) => {
  try {
    const response = await fetch(`${BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    res.send(`
        <h2>${data.message}</h2>

        <h3>Student Details</h3>

        <p>Name : ${data.student.name}</p>
        <p>Email : ${data.student.email}</p>
        <p>Age : ${data.student.age}</p>
        <p>Course : ${data.student.course}</p>

        <a href="/">Back</a>
    `);
  } catch (err) {
    console.log(err);
    res.send("Backend Connection Error");
  }
});

// Server Start
app.listen(3000, () => {
  console.log("Frontend Running on Port 3000");
});