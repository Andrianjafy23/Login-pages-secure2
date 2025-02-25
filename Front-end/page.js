 
 document.addEventListener("DOMContentLoaded", () => {
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "index.html"; // Redirection si pas connecté
    } else {
      // Décoder le token JWT pour récupérer le nom et l'email
      const payload = JSON.parse(atob(token.split(".")[1])); 

      nameElement.textContent = `Bonjour, ${payload.name} !`;
      emailElement.textContent = `Email: ${payload.email}`;
    }
  });

  document.getElementById("button").addEventListener("click", () => {
    localStorage.removeItem("token"); // Supprime le token à la déconnexion
    window.location.href = "index.html"; // Redirige après déconnexion
  });

  fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "secure.html"; // Redirige vers la page sécurisée
    } else {
      alert(data.message);
    }
  });