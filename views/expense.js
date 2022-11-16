const token = localStorage.getItem("token");
const btn = document.getElementById("button");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("hello");
  const name = document.getElementById("name");
  const des = document.getElementById("des");
  const categ = document.getElementById("categ");
  const obj = {
    name: name.value,
    des: des.value,
    categ: categ.value,
  };
  console.log(obj);
  const token = localStorage.getItem("token");
  axios
    .post("http://localhost:3000/addExpenses", obj, {
      headers: { Authorization: token },
    })
    .then((response) => {
      showListofRegisteredUser(response.data.data);
      console.log(response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4>something went wrong </h4>";
      console.log(err);
    });
  //localStorage.setItem(obj.description,JSON.stringify(obj))

  //clear fields
  name.value = "";
  des.value = "";
  categ.value = "";
});
function showListofRegisteredUser(user) {
  const parentNode = document.getElementById("userlist");
  const createNewUserHtml = `<li id='${user.id}'>${user.name} - ${user.des} - ${user.categ}
                                        <button onclick=deleteUser('${user.id}')>Delete</button>
                                        <button onclick=EditUser('${user.name}','${user.des}','${user.categ}','${user.id}')>Edit</button>
                                    </li>`;
  console.log(createNewUserHtml);
  parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
  console.log(parentNode.innerHTML);
}
window.addEventListener("load", (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/getExpenses", {
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response.data);
      for (let i = 0; i < response.data.response.length; i++) {
        let name = response.data.response[i].name;
        let des = response.data.response[i].des;
        let categ = response.data.response[i].categ;
        let id = response.data.response[i].id;

        const parentNode = document.getElementById("userlist");
        const createNewUserHtml = `<li id='${id}'>${name} - ${des} - ${categ}
                                        <button onclick=deleteUser('${id}')>Delete</button>
                                        <button onclick=EditUser('${name}','${des}','${categ}','${id}')>Edit</button>
                                    </li>`;
        //console.log(createNewUserHtml)
        parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
        //  console.log(parentNode.innerHTML)
        // console.log();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function deleteUser(userid) {
  const token = localStorage.getItem("token");
  axios
    .delete(`http://localhost:3000/del/${userid}`, {
      headers: { Authorization: token },
    })

    .then((response) => removeItemFromScreen(userid))
    // console.log(response))
    .catch((err) => console.log(err));
}

function removeItemFromScreen(userid) {
  const parentNode = document.getElementById("userlist");
  const elem = document.getElementById(userid);
  parentNode.removeChild(elem);
}

function EditUser(name, des, categ, id) {
  document.getElementById("name").value = name;
  document.getElementById("des").value = des;
  document.getElementById("categ").value = categ;

  deleteUser(id);
}

document.getElementById("rzp-button1").onclick = async function (e) {
  const response = await axios.get(
    "http://localhost:3000/purchase/premiummembership",
    { headers: { Authorization: token } }
  );
  console.log(response);
  var options = {
    key: response.data.key_id, // Enter the Key ID generated from the Dashboard
    name: "Test Company",
    order_id: response.data.order.id, // For one time payment
    prefill: {
      name: "Test User",
      email: "test.user@example.com",
      contact: "7003442036",
    },
    theme: {
      color: "#3399cc",
    },
    // This handler function will handle the success payment
    handler: function (response) {
      console.log(response);
      axios
        .post(
          "http://localhost:3000/purchase/updatetransactionstatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        )
        .then(() => {
          alert("You are a Premium User Now");
        })
        .catch(() => {
          alert("Something went wrong. Try Again!!!");
        });
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
};
const leaderBoard=document.getElementById('leader');
leaderBoard.addEventListener('click',()=>{
  if (confirm('Are you sure')) {
    window.location='leaderboard.html';
  }
})

function download(){
  axios.get('http://localhost:3000/user/download', { headers: {"Authorization" : token} })
  .then((response) => {
      if(response.status === 201){
          //the bcakend is essentially sending a download link
          //  which if we open in browser, the file would download
          var a = document.createElement("a");
          a.href = response.data.fileUrl;
          a.download = 'myexpense.csv';
          a.click();
      } else {
          throw new Error(response.data.message)
      }

  })
  .catch((err) => {
      showError(err)
  });
}