const session = localStorage.getItem("session");
if (!session) {
  window.location.href = "connexion.html";
} else {
  fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${session}`
    }
  })
  .then(response => response.json())
  .then(data => {
    // Vérification si les données contiennent les informations de l'utilisateur
    console.log(data); 
    document.getElementById("name").textContent = `Bonjour, ${data.name} !`;
    document.getElementById("email").textContent = `Email : ${data.email}`;
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des données utilisateur", error);
  });
}

  
    document.getElementById("button").addEventListener("click", () => {
      localStorage.removeItem("session");
      window.location.href = "connexion.html"; // Redirige après déconnexion
    });