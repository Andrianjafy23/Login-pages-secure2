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
        console.log("Réponse du serveur :", data);

        if (response.ok) {
            message.style.color = "green";
            message.textContent = "Utilisateur bien existé !";

            console.log("Redirection prévue dans 3 secondes...");
            setTimeout(() => {
                console.log("Redirection en cours...");
                window.location.href = `reset-password.html?email=${encodeURIComponent(email)}`;
            }, 1000);
        } else {
            message.style.color = "red";
            message.textContent = "Erreur : " + data.message;
            console.log("Erreur du serveur :", data.message);
        }
    } catch (error) {
        message.style.color = "red";
        message.textContent = "Erreur de connexion au serveur.";
        console.error("Erreur de connexion :", error);
    }

    message.style.display = "block";
});
