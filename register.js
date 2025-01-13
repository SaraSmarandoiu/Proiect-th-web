document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        if (!username || !email || !password || !confirmPassword) {
            alert("Toate câmpurile sunt obligatorii.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Parolele nu coincid.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[email]) {
            alert("Un utilizator cu acest email există deja.");
            return;
        }

        users[email] = {
            username: username,
            password: password,
        };
        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "index.html";
    });
});
