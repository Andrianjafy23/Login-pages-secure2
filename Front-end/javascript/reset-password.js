document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");

    if (!email) {
        alert("Email non trouvé !");
        window.location.href = "password.html";
        return;
    }

    document.getElementById("email").value = email;

    document.getElementById("resetPasswordForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("message");

        if (newPassword !== confirmPassword) {
            message.style.color = "red";
            message.textContent = "Les mots de passe ne correspondent pas.";
            message.style.display = "block";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword, confirmPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                message.style.color = "green";
                message.textContent = "Mot de passe modifié avec succès !";
                setTimeout(() => window.location.href = "connexion.html", 1000);
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
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("Afficher").addEventListener("change", function () {
        let newPasswordField = document.getElementById("newPassword");
        let confirmPasswordField = document.getElementById("confirmPassword");
        
        let type = this.checked ? "text" : "password";
        newPasswordField.type = type;
        confirmPasswordField.type = type;
    });
});