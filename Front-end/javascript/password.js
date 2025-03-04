

document.getElementById("forgotPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch("http://localhost:3000/api/check-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = `reset-password.html?email=${encodeURIComponent(email)}`;
        } else {
            message.style.color = "red";
            message.textContent = "Erreur : " + data.message;
        }
    } catch (error) {
        message.style.color = "red";
        message.textContent = "Erreur de connexion au serveur.";
    }

    message.style.display = "block";
});
