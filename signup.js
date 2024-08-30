document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('signupusername').value;
    const password = document.getElementById('signuppassword').value;
    const confirmpassword = document.getElementById('confirmpassword').value;
    const signupmessage = document.getElementById('signupmessage');

    if (password !== confirmpassword) {
        signupmessage.style.color = 'red';
        signupmessage.innerHTML = "Passwords do not match!";
        return;
    }

    signupmessage.style.color = 'green';
    signupmessage.innerHTML = "Signup successful! Redirecting to login...";

    setTimeout(function() {
        window.location.href = "login.html"; 
    }, 2000);
});