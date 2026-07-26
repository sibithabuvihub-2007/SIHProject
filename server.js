const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Database Connection
const db = new sqlite3.Database("waste.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Database Connected");
    }
});

// =====================
// CREATE TABLES
// =====================

// Worker Table
db.run(`
CREATE TABLE IF NOT EXISTS Worker(
    worker_id INTEGER PRIMARY KEY,
    worker_name TEXT,
    phone TEXT
)
`);

// Route Table
db.run(`
CREATE TABLE IF NOT EXISTS Route(
    route_id INTEGER PRIMARY KEY,
    route_name TEXT,
    area TEXT
)
`);

// Attendance Table
db.run(`
CREATE TABLE IF NOT EXISTS Attendance(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    worker_id INTEGER,
    attendance_date TEXT,
    status TEXT
)
`);

// Complaint Table
db.run(`
CREATE TABLE IF NOT EXISTS Complaint(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route TEXT,
    description TEXT
)
`);

// =====================
// WORKER
// =====================

// Add Worker
app.post("/addWorker", (req, res) => {

    const { worker_id, worker_name, phone } = req.body;

    db.run(
        "INSERT INTO Worker(worker_id, worker_name, phone) VALUES (?, ?, ?)",
        [worker_id, worker_name, phone],
        (err) => {

            if (err)
                return res.send("Error");

            res.redirect("/worker.html");

        }
    );

});

// View Workers
app.get("/workers", (req, res) => {

    db.all("SELECT * FROM Worker", (err, rows) => {

        if (err)
            return res.send(err);

        res.json(rows);

    });

});

// =====================
// ROUTE
// =====================

// Add Route
app.post("/addRoute", (req, res) => {

    const { route_id, route_name, area } = req.body;

    db.run(
        "INSERT INTO Route(route_id, route_name, area) VALUES (?, ?, ?)",
        [route_id, route_name, area],
        (err) => {

            if (err)
                return res.send("Error");

            res.redirect("/route.html");

        }
    );

});

// View Routes
app.get("/routes", (req, res) => {

    db.all("SELECT * FROM Route", (err, rows) => {

        if (err)
            return res.send(err);

        res.json(rows);

    });

});

// =====================
// ATTENDANCE
// =====================

// Add Attendance
app.post("/addAttendance", (req, res) => {

    const { worker_id, attendance_date, status } = req.body;

    db.run(
        "INSERT INTO Attendance(worker_id, attendance_date, status) VALUES (?, ?, ?)",
        [worker_id, attendance_date, status],
        (err) => {

            if (err)
                return res.send("Error");

            res.redirect("/attendance.html");

        }
    );

});

// View Attendance
app.get("/attendance", (req, res) => {

    db.all("SELECT * FROM Attendance", (err, rows) => {

        if (err)
            return res.send(err);

        res.json(rows);

    });

});

// =====================
// COMPLAINT
// =====================

// Add Complaint
app.post("/addComplaint", (req, res) => {

    const { route, description } = req.body;

    db.run(
        "INSERT INTO Complaint(route, description) VALUES (?, ?)",
        [route, description],
        (err) => {

            if (err)
                return res.send("Error");

            res.redirect("/complaint.html");

        }
    );

});

// View Complaints
app.get("/complaints", (req, res) => {

    db.all("SELECT * FROM Complaint", (err, rows) => {

        if (err)
            return res.send(err);

        res.json(rows);

    });

});

// =====================
// START SERVER
// =====================

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});