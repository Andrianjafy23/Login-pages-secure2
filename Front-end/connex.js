if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(() => {
        console.log("Service Worker enregistré");
    }).catch(err => console.error("Échec de l'enregistrement du Service Worker", err));
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    try {
        const response = await fetch(`http://localhost:3000/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("session", data.token);
            errorMessage.style.display = "none";

            setTimeout(() => {
                window.location.href = "secure.html";
            }, 2000);
        } else {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Email ou mot de passe incorrect";
        }
    } catch (err) {
        console.error("Erreur:", err);
        errorMessage.style.display = "block";
        errorMessage.textContent = "Mode hors ligne. Vérifiez votre connexion.";
    }
});
