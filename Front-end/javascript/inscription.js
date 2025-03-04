document.getElementById("Afficher").addEventListener("change", function () {
    let passwordField = document.getElementById("password");
    if (this.checked) {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
});

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    })
    .then(rep => rep.json())
    .then(rep => {
        if (rep.inscrit) {
            setTimeout(() => {
                window.location.href = 'connexion.html';
            }, 1000);
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
