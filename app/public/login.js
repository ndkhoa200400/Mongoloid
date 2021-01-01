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
    console.log("OK");
    if (res.data.status === "success") {
      alert("Đăng nhập thành công");
      window.setTimeout(() => {
        location.assign("/"); // back to home page
      }, 1000);
    } else {
      console.log(res.data.error.message);
      alert(res.data.error.message);
    }
  } catch (err) {
    console.log(err);
    let res = err.response.data;
    console.log(err.response.data);
    alert(err.response.data.message);
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
      alert("Đăng ký thành công");
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
export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:8000/api/user/logout",
    });

  } catch (err) {
    // show alert page here
    alert("LOI" + err);
  }
};

export const changePassword = async (passwordCurrent, password) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:8000/api/user/updateMyPassword",
      data: {
        passwordCurrent: passwordCurrent,
        password: password
      }
    });
    if (res.data.status === 'success') {
      alert("Đổi mật khẩu thành công");
      window.setTimeout(() => {
        location.assign("/"); // back to home page
      }, 1000);
    } else {
      
    }
  } catch (error) {

  }
}