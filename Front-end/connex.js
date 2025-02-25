
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("password").value;

    fetch(`http://localhost:5000/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then( rep => rep.json())
    .then( rep => {
        console.log("reponse ",rep.user);
        localStorage.setItem("session", rep.user);
        if(rep.user){
            setTimeout(() => {
                window.location.href = 'secure.html';
            }, 5000);
       }else{
            console.log("message");
        }
    })
    .catch(err  => {
        console.log(rep);
    });

});

