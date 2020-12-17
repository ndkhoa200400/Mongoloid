import '@babel/polyfill';

import {login, signup} from './login';
import {searchByName} from './product-api';



const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector('.form--signup')
const searchForm = document.querySelector(".form--search");
if(loginForm)
{
  loginForm.addEventListener("submit", (e) => {

    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    login(email, password)
  });
  
}

if (signupForm)
{
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("s-username").value;
    const email = document.getElementById("s-mail").value;
    const password = document.getElementById("s-password").value;
    const passwordConfirm = document.getElementById("s-password-confirm").value;
    const phone = document.getElementById("s-phone").value
    console.log(name, email, password,passwordConfirm)
    signup(name, email, phone, password,passwordConfirm);
  });
}

