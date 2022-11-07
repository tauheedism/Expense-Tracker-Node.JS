async function signup(e) {
  try {
    e.preventDefault();
    const signUpDetails = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password,
    };
    console.log(signUpDetails);
    const response=await axios.post('http://localhost:3000/user/signup',signUpDetails)
    if (response.status===200) {
        window.location.href='../Login/login.html';
    }
    else{
        throw new Error('Failed to login')
    }
  } catch (error) {
    document.body.innerHTML+=`<div style="color:red";>${error}</div>;`
  }
}
