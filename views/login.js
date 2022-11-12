function login(e) {
  e.preventDefault();
  // console.log(e.target.name);
  const loginDetails = {
    email: e.target.email.value,
    password: e.target.password.value,
  };
  console.log(loginDetails);
  axios
    .post("http://localhost:3000/login", loginDetails)
    .then((response) => {
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      window.location = "expense.html";
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      document.body.innerHTML += `<div style="color:red";>${err.message} </div>`;
    });
  e.target.email.value = "";
  e.target.password.value = "";
}

function forgotPassword() {
  window.location = "forgot.html";
}
