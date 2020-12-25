import axios from "axios";
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8000/api/user/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      alert("Login successfully");
      window.setTimeout(() => {
        location.assign("/"); // back to home page
      }, 1500);
    } else {
      alert("Username or password is incorrect");
    }
  } catch (e) {
    console.log(e);
  }
};

export const signup = async (username, email, phone, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8000/api/user/signup",
      data: {
        username,
        email,
        phone,
        password,
        passwordConfirm,
      },
    });
    console.log(res);
    if (res.data.status === "success") {
      alert("Signed up successfully");
      window.setTimeout(() => {
        location.assign("/"); // back to home page
      }, 1000);
    } else {
        alert(res.data.error.message);
        
    }
  } catch (err) {
    // show alert page here
    console.log(err);
  }
};
