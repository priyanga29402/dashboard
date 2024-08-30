// Login Handling
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation (in a real scenario, this should be more secure)
    if (username === 'employee' && password === 'password') {
        const loginTime = new Date().toLocaleString();
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('loginTime', loginTime);
        window.location.href = 'user.html';
    } else {
        alert('Invalid credentials');
    }
});

// Dashboard Initialization
window.onload = function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('user').textContent = loggedInUser;
        document.getElementById('loginTime').textContent = 'Login Time: ' + localStorage.getItem('loginTime');
        document.getElementById('logoutTime').textContent = 'Logout Time: ' + (localStorage.getItem('logoutTime') || 'Not logged out');
    } else {
        window.location.href = 'userlogin.html'; // Redirect to login if not logged in
    }

    // Logout Handling
    document.getElementById('logout').addEventListener('click', function() {
        const logoutTime = new Date().toLocaleString();
        localStorage.setItem('logoutTime', logoutTime);
        localStorage.removeItem('loggedInUser');
        window.location.href = 'userlogin.html';
    });

    // Apply Leave Handling
    document.getElementById('applyLeave').addEventListener('click', function() {
        document.getElementById('leaveSection').style.display = 'block';
    });

    document.getElementById('leaveForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const leaveDate = document.getElementById('leaveDate').value;
        const reason = document.getElementById('reason').value;
        const leaveRequest = { date: leaveDate, reason: reason, status: 'Pending' };

        let leaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
        leaveRequests.push(leaveRequest);
        localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));

        alert('Leave request submitted!');
        document.getElementById('leaveSection').style.display = 'none';
    });

    // Daily Announcement (Hardcoded for now, can be dynamic with a backend)
    document.getElementById('announcement').textContent = "Team meeting at 3 PM today.";
};



// --------------------Assigning Task-----------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const adminForm = document.getElementById('admin-form');
    const userForm = document.getElementById('user-form');
    const tasksTbody = document.getElementById('tasks');
    const tasksContainer = document.getElementById('tasks-container');
    const addTaskButton = document.getElementById('add-task');

    const tasks = [];

    function renderTasks() {
        tasksTbody.innerHTML = '';
        tasks.forEach(task => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${task.title}</td>
                <td>${task.assignee}</td>
                <td>${task.date}</td>
            `;
            tasksTbody.appendChild(tr);
        });
    }

    function addTaskRow() {
        const row = document.createElement('div');
        row.classList.add('task-row');
        row.innerHTML = `
            <input type="text" class="task-title" placeholder="Task Title" required>
            <input type="text" class="task-assignee" placeholder="Assign to (Username)" required>
            <input type="date" class="task-date" required>
        `;
        tasksContainer.appendChild(row);
    }

    adminForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const rows = tasksContainer.querySelectorAll('.task-row');
        rows.forEach(row => {
            const title = row.querySelector('.task-title').value;
            const assignee = row.querySelector('.task-assignee').value;
            const date = row.querySelector('.task-date').value;
            tasks.push({ title, assignee, date });
        });
        renderTasks();
        adminForm.reset();
        // Remove all rows after submission
        tasksContainer.innerHTML = '';
    });

    addTaskButton.addEventListener('click', function () {
        addTaskRow();
    });

    userForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('user-task-title').value;
        const date = document.getElementById('user-task-date').value;
        tasks.push({ title, assignee: 'Self', date });
        renderTasks();
        userForm.reset();
    });

    // Initialize with one task row
    addTaskRow();
});
