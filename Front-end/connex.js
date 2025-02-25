document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message"); // Sélection du message d'erreur

    fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then(rep => rep.json())
    .then(rep => {
        if (rep.token) {
            localStorage.setItem("session", rep.token);
            errorMessage.style.display = "none"; // Cache le message d'erreur si l'utilisateur est trouvé
            setTimeout(() => {
                window.location.href = 'secure.html';
            }, 5000);
        } else {
            errorMessage.style.display = "block"; // Affiche le message d'erreur
            errorMessage.textContent = "Email ou mot de passe incorrect";
        }
    })
    .catch(err => {
        console.error("Erreur:", err);
        errorMessage.style.display = "block";
        errorMessage.textContent = "Une erreur est survenue. Veuillez réessayer.";
    });
});
