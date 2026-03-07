document.getElementById("Sign-in-btn").addEventListener("click", function(){

    const usernameInput = document.getElementById("input-Username");
    const username = usernameInput.value ;
    
    const inputPassword = document.getElementById("input-Password")
    const password = inputPassword.value

    if(username === "admin" && password === "admin123"){

        alert ( "Sign in successful")
        window.location.assign("/home.html")
    }
    else{
        alert("Sign in failed  please check your username and password and try again ")
        return
    }



})