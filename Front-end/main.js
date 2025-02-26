document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Envoyer la requête POST pour l'inscription
    fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    })
    .then(rep => rep.json())
    .then(rep => {
        if (rep.inscrit) {
            // Redirection en cas de succès
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else if (rep.message) { 
            document.getElementById("error-message").textContent = rep.message;
            document.getElementById("error-message").style.display = "block";
        }
    })
    .catch(err => {
        console.error("Erreur:", err);
        alert("Une erreur s'est produite. Veuillez réessayer.");
    });
});
