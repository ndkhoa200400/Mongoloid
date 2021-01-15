import axios from "axios";
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:8000/user/login",
      data: {
        email,
        password,
      },
    }); 
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
      url: "http://localhost:8000/user/signup",
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
    let res = err.response.data;
    alert(res.message)
  }
};
export const logout = async () => {
  console.log('ok');
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:8000/user/logout",
    });
    

  } catch (err) {
    let res = error.response.data;

    alert(res.message)
  }
};

export const changePassword = async (passwordCurrent, password) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:8000/user/updateMyPassword",
      data: {
        passwordCurrent: passwordCurrent,
        password: password
      }
    });
    if (res.data.status === 'success') {
      alert("Đổi mật khẩu thành công");
      window.setTimeout(() => {
        location.reload(); // back to home page
      }, 1000);
    } else {
   
      console.log(res.data);
    }
  } catch (error) {
    let res = error.response.data;
    console.log(res);
    alert(res.message)
  }
}