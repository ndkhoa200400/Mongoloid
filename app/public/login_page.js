
function switchStatus() {
  const switchingDiv = document.getElementById("switching");
  const button = document.getElementById("switch-button");
  const loginForm = document.getElementById("login");
  const signupForm = document.getElementById("signup");
  const switchText = document.getElementById("switch-text");
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, 500);
  if (button.innerText === "SIGN UP") {
    switchingDiv.className = "translate-left";
    button.innerText = "SIGN IN";
    setTimeout(() => {
      switchText.innerHTML = "Hello!<p>Already have account?</p>";
    }, 500);

    setTimeout(() => {
      loginForm.hidden = "on";
      signupForm.hidden = "";
    }, 250);
  } else {
    switchingDiv.className = "translate-right";
    button.innerText = "SIGN UP";
    setTimeout(() => {
      loginForm.hidden = "";
      signupForm.hidden = "on";
    }, 300);
    setTimeout(() => {
      switchText.innerHTML = "Welcome!<p>Don't have any account?</p>";
    }, 500);
  }
}

