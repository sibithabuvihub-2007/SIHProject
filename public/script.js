// =======================
// Worker List
// =======================

function loadWorkers() {

    const table = document.getElementById("workerTable");

    if (!table) return;

    fetch("/workers")
        .then(res => res.json())
        .then(data => {

            table.innerHTML = "";

            data.forEach(worker => {

                table.innerHTML += `
                <tr>
                    <td>${worker.worker_id}</td>
                    <td>${worker.worker_name}</td>
                    <td>${worker.phone}</td>
                </tr>
                `;

            });

        });

}

// =======================
// Route List
// =======================

function loadRoutes() {

    const table = document.getElementById("routeTable");

    if (!table) return;

    fetch("/routes")
        .then(res => res.json())
        .then(data => {

            table.innerHTML = "";

            data.forEach(route => {

                table.innerHTML += `
                <tr>
                    <td>${route.route_id}</td>
                    <td>${route.route_name}</td>
                    <td>${route.area}</td>
                </tr>
                `;

            });

        });

}

// =======================
// Attendance List
// =======================

function loadAttendance() {

    const table = document.getElementById("attendanceTable");

    if (!table) return;

    fetch("/attendance")
        .then(res => res.json())
        .then(data => {

            table.innerHTML = "";

            data.forEach(att => {

                table.innerHTML += `
                <tr>
                    <td>${att.worker_id}</td>
                    <td>${att.attendance_date}</td>
                    <td>${att.status}</td>
                </tr>
                `;

            });

        });

}

// =======================
// Complaint List
// =======================

function loadComplaints() {

    const table = document.getElementById("complaintTable");

    if (!table) return;

    fetch("/complaints")
        .then(res => res.json())
        .then(data => {

            table.innerHTML = "";

            data.forEach(c => {

                table.innerHTML += `
                <tr>
                    <td>${c.route}</td>
                    <td>${c.description}</td>
                </tr>
                `;

            });

        });

}

// =======================
// Load All Pages
// =======================

window.onload = function () {

    loadWorkers();
    loadRoutes();
    loadAttendance();
    loadComplaints();

};