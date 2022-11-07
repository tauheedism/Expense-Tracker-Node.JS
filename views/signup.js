function signup(e) {
  e.preventDefault();
  const signUpDetails = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };
  console.log(signUpDetails);
  axios
    .post("http://localhost:3000/signup", signUpDetails)
    .then((response) => {
      console.log(response);
      window.location='login.html';
    })
    .catch((err) => {
      console.log(err);
    });
  // if (response.status===200) {
  //     window.location.href='../Login/login.html';
  // }
  // else{
  //     throw new Error('Failed to login')
  // }
}
