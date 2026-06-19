const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Temporary Database
let students = [
    {
        id: 1,
        name: "John",
        course: "Computer Science"
    }
];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Student Management API");
});

// ======================================
// GET ALL STUDENTS
// ======================================

app.get("/students", (req, res) => {

    res.status(200).json(students);

});

// ======================================
// GET STUDENT BY ID
// ======================================

app.get("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        s => s.id === id
    );

    if (!student) {

        return res.status(404).json({
            success: false,
            message: "Student not found"
        });

    }

    res.status(200).json(student);

});

// ======================================
// ADD NEW STUDENT
// ======================================

app.post("/students", (req, res) => {

    const { name, course } = req.body;

    if (!name || !course) {

        return res.status(400).json({
            success: false,
            message: "Name and Course are required"
        });

    }

    const newStudent = {

        id: students.length + 1,

        name,

        course

    };

    students.push(newStudent);

    res.status(201).json({

        success: true,

        message: "Student Added Successfully",

        data: newStudent

    });

});

// ======================================
// UPDATE STUDENT
// ======================================

app.put("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        s => s.id === id
    );

    if (!student) {

        return res.status(404).json({

            success: false,

            message: "Student not found"

        });

    }

    const { name, course } = req.body;

    if (name) {
        student.name = name;
    }

    if (course) {
        student.course = course;
    }

    res.status(200).json({

        success: true,

        message: "Student Updated Successfully",

        data: student

    });

});

// ======================================
// DELETE STUDENT
// ======================================

app.delete("/students/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(
        s => s.id === id
    );

    if (index === -1) {

        return res.status(404).json({

            success: false,

            message: "Student not found"

        });

    }

    const deletedStudent =
        students.splice(index, 1);

    res.status(200).json({

        success: true,

        message: "Student Deleted Successfully",

        data: deletedStudent

    });

});

// ======================================
// SERVER
// ======================================

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});