const token = localStorage.getItem("token");
const btn = document.getElementById("buttonAdd");
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
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/getExpenses", {
      headers: { Authorization: token },
    })
    .then((response) => {
      if (response.data.user.premiumuser == true) {
        document.getElementById("body").classList.add("premium");
        document.getElementById("logout").classList.add("premium");
        document.getElementById("buttonAdd").classList.add("premium");
        document.getElementById("rzp-button1").classList.add("premium");
        const leaderReportParent = document.getElementById("leaderReport");
        const lbRprt = `<li>
                            <a href='leaderboard.html' id="leader" class="btn btn-primary float-right">Leaderboard</a>
                            <a href='report.html' id="report" class="btn btn-primary float-left">Report</a>
                       </li>`;
        leaderReportParent.innerHTML = leaderReportParent.innerHTML + lbRprt;
        document.getElementById("rzp-button1").remove();
        const logout = document.getElementById("logout");
        logout.addEventListener("click", () => {
          if (confirm("ARE U SURE")) {
            window.location = "login.html";
          }
        });
        const leaderBoard = document.getElementById("leader");
        leaderBoard.addEventListener("click", () => {
          if (confirm("Are you sure")) {
            window.location = "leaderboard.html";
          }
        });
      }
      for (let i = 0; i < response.data.response.length; i++) {
        let name = response.data.response[i].name;
        let des = response.data.response[i].des;
        let categ = response.data.response[i].categ;
        let id = response.data.response[i].id;

        const parentNode = document.getElementById("userlist");
        const createNewUserHtml = `<li id='${id}'>${name} - ${des} - ${categ}
                                        <button class="btn btn-primary" onclick=deleteUser('${id}')>Delete</button>
                                        <button class="btn btn-primary" onclick=EditUser('${name}','${des}','${categ}','${id}')>Edit</button>
                                    </li>`;

        parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
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
      name: "Tauheed",
      email: "tauheedsiddiqui8760@gmail.com",
      contact: "8077279723",
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
          document.getElementById("body").classList.add("premium");
          document.getElementById("logout").classList.add("premium");
          document.getElementById("buttonAdd").classList.add("premium");
          document.getElementById("rzp-button1").classList.add("premium");
          const leaderReportParent = document.getElementById("leaderReport");
          const lbRprt = `<li>
                            <a href='leaderboard.html' id="leader" class="btn btn-primary float-right">Leaderboard</a>
                            <a href='report.html' id="report" class="btn btn-primary float-left">Report</a>
                       </li>`;
          leaderReportParent.innerHTML = parentNode.innerHTML + lbRprt;
          document.getElementById("rzp-button1").remove();
          const logout = document.getElementById("logout");
          logout.addEventListener("click", () => {
            if (confirm("ARE U SURE")) {
              window.location = "login.html";
            }
          });
          const leaderBoard = document.getElementById("leader");
          leaderBoard.addEventListener("click", () => {
            if (confirm("Are you sure")) {
              window.location = "leaderboard.html";
            }
          });
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

// let p = 0;
// let pp = 1;
// let pag = document.getElementById('pagination');

// function pagination(e) {
//     axios.get("http://localhost:3000/getExpenses")
//     .then((response)=>{
//         console.log(response.data)
//       let number_of_pages;
//       if(response.data.user.length % 10 == 0) {
//          number_of_pages = Math.trunc(((response.data.user.length)/10))
//       } else {
//          number_of_pages = Math.trunc(((response.data.user.length)/10)+1)
//       }

//       for (let i = 0; i < number_of_pages; i++) {
//         pag.innerHTML += `<button class="pagebtn" id="?page=${p++}">${pp++}</button> `;
//         console.log(pag)
//       }
//     })
//     .catch(err=> NotifyUser(err))
//   }

//   pag.addEventListener('click', (e)=>{
//     let id = e.target.id;
//     console.log(id)
//     axios.get(`http://localhost:3000/limited${id}`)
//     .then(response=>{
//         console.log(response.data.user)
//       let products = response.data.user;
//        let container="";
//         let parent = document.getElementById("rows");
//        for( let i =0;i<response.data.user.length;i++)
//        {
//         let name = response.data.response[i].name;
//         let des = response.data.response[i].des;
//         let categ = response.data.response[i].categ;
//         let id = response.data.response[i].id;
//          container+=` <div class="bag">
//                  <h4 class="bag-title" >${name}</h4>
//                <img src="${des}"  class="images" alt="" width="300px" height="300px">
//                <div class="price-cart">
//                       <h3 class="price">${categ}</h3>
//                   <button type="button" class="addtocart" id="btn" onClick="addToCartClicked(${id})">ADD TO CART</button>
//                 </div>
//              </div>`
//        }

//         parent.innerHTML = container;
//     })
//     .catch(err=> console.log(err))
//   })
