document.getElementById("resetForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;

    const response = await fetch("http://localhost:3000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();
    const message = document.getElementById("message");

    if (data.success) {
        message.style.color = "green";
        message.textContent = "Un lien de réinitialisation a été envoyé à votre email.";
    } else {
        message.style.color = "red";
        message.textContent = "Erreur : " + data.message;
    }
    message.style.display = "block";
});
