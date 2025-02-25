document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

  

    fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    })
    .then( rep => rep.json())
    .then( rep => {
        console.log("reponse ",rep);
        if(rep.inscrit){
            setTimeout(() => {
              window.location.href = 'index.html';
            }, 4000);
        }else {
            console.log("message");
        }
    })
    .catch(err  => {
        console.log(rep);
    });

});
