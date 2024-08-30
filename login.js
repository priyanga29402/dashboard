document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    
    const adminCredential = { username: "admin", password: "admin123" };
    const userCredential = { username: "user", password: "user123" };

    if (username === adminCredential.username && password === adminCredential.password) {
        alert("Welcome Admin");
        window.location.href = "admin.html";
    }
    else if (username === userCredential.username && password === userCredential.password) {
        alert("Welcome User");
        window.location.href = "user.html";
    }
    else {
        messageElement.style.color ='red';
        messageElement.innerHTML = "Invalid Username or Password";
    }
});