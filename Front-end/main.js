document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`http://localhost:3000/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    })

    .then( reponse => {
        console.log(reponse);
    })
    .catch(err => {
        console.log(reponse)
    })
    const data =  res.json();
    alert(data.message || "Inscription réussie !");
});





