import '@babel/polyfill';

import { login, signup, logout, changePassword } from './login';


const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector('.form--signup')
const logOutBtn = document.getElementById("logout");
const changepassBtn = document.querySelector('.form--changepass');
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {

    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password)
  });

}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("s-username").value;
    const email = document.getElementById("s-mail").value;
    const password = document.getElementById("s-password").value;
    const passwordConfirm = document.getElementById("s-password-confirm").value;
    const phone = document.getElementById("s-phone").value
    console.log(name, email, password, passwordConfirm)
    signup(name, email, phone, password, passwordConfirm);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);
if (changepassBtn) {
  changepassBtn.addEventListener('submit', (e) => {
    console.log('po');
    e.preventDefault();

    const passwordCurrent = document.querySelector('.oldpass-check').value;
    const password = document.querySelector('.newpass').value;
    
    changePassword(passwordCurrent, password);
  })
}