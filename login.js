document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Te rugăm să completezi toate câmpurile.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || {};
        const user = users[email];

        if (user && user.password === password) {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("currentUser", email);
            window.location.href = "index.html";
        } else {
            alert("Email sau parolă incorecte.");
        }
    });

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
        window.location.href = "index.html";
    }
});
