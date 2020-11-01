function switchStatus()
{
    const switchingDiv = document.getElementById("switching");
    const button = document.getElementById("switch-button");
    const loginForm = document.getElementById("login");
    const signupForm =  document.getElementById("signup");
    const switchText = document.getElementById("switch-text");
    if (button.innerText==="Sign Up")
    {
        switchingDiv.className = "translate-left";     
        button.innerText = "Sign In";       
        setTimeout(()=>{
            switchText.innerText = "Hello Friend!";
            switchText.className = "switch-text-left";
        }, 400);
        
        setTimeout(()=>{
            loginForm.hidden = "on";
            signupForm.hidden = "";
        }, 400);
       

    }    
    else
    {    
        switchingDiv.className = "translate-right";
        button.innerText = "Sign Up";
        setTimeout(()=>{
            loginForm.hidden = "";
            signupForm.hidden = "on";
        }, 300);
        setTimeout(()=>{
            switchText.innerText = "Welcome Back!";
            switchText.className = "switch-text-right";
        }, 450);
      
      
       
    }
    
    
}