const session = localStorage.getItem("session");
if (!session) {
  window.location.href = "connexion.html"; 
}

document.getElementById("password-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const messageEl = document.getElementById("message");

  if (newPassword !== confirmPassword) {
    messageEl.textContent = "Les mots de passe ne correspondent pas.";
    messageEl.style.color = "red";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session}`, 
      },
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      messageEl.textContent = data.message || "Mot de passe modifié avec succès.";
      messageEl.style.color = "green";
      
      setTimeout(() => {
        window.location.href = "secure.html";
      }, 1000);
      
    } else {
      messageEl.textContent = data.message || "Une erreur est survenue.";
      messageEl.style.color = "red";
    }
  } catch (error) {
    messageEl.textContent = "Erreur de connexion au serveur.";
    messageEl.style.color = "red";
    console.error("Erreur :", error); 
  }
});

document.getElementById("Afficher").addEventListener("change", function () {
    const passwordFields = [
        document.getElementById("current-password"),
        document.getElementById("new-password"),
        document.getElementById("confirm-password")
    ];
    
    passwordFields.forEach(function (field) {
        if (this.checked) {
            field.type = "text";
        } else {
            field.type = "password";
        }
    }.bind(this));
});
