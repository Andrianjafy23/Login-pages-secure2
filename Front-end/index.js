document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("password").value;

    fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })

    .then( rep => {
        console.log(rep);
    })
    .catch(err  => {
        console.log(rep);
    });

    // const data =  res.json();
    
    // if (res.ok) {
    //     localStorage.setItem("token", data.token);
    //     localStorage.setItem("user", JSON.stringify(data.user));
    //     updateUserInfo();
    //     alert("Connexion réussie !");
    // } else {
    //     alert(data.error || "Erreur de connexion");
    // }
});

function updateUserInfo() {
    const user = localStorage.getItem("user");
    if (user) {
        const userData = JSON.parse(user);
        document.getElementById("userInfo").textContent = `Connecté en tant que : ${userData.name}`;
    } else {
        document.getElementById("userInfo").textContent = "Non connecté";
    }
}