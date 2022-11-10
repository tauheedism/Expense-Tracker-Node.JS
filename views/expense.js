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
  const token=localStorage.getItem('token');
  axios
    .post("http://localhost:3000/addExpenses",obj, {headers:{"Authorization":token}})
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
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const token=localStorage.getItem('token');
  axios
    .get("http://localhost:3000/getExpenses",{headers:{'Authorization':token}})
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
    const token=localStorage.getItem('token')
  axios
    .delete(`http://localhost:3000/del/${userid}`,{headers:{'Authorization':token}})

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
