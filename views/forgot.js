// const sgMail = require('@sendgrid/mail')

function forgotPassword(e) {
  e.preventDefault();
  console.log(e.target.name);
  const form = new FormData(e.target);

  const userDetails = {
    email: form.get("email"),
  };
  console.log(userDetails);
  axios
    .post("http://localhost:3000/password/forgotpassword", userDetails)
    .then((response) => {
      if (response.status === 202) {
        document.body.innerHTML +=
          '<div style="color:red;">Mail Successfuly sent <div>';
      } else {
        throw new Error("Something went wrong!!!");
      }
    })
    .catch((err) => {
      document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    });
}

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'tauheedsiddiqui8760@gmail.com', // Change to your recipient
//   from: 'mohammadtauheedbly@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })