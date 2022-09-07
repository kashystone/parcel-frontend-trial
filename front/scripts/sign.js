
const signUp = event => {
  console.log("We are in the button")
  event.preventDefault();

  const password = document.querySelector('#password').value;
  const confirm_password = document.querySelector('#confirm_password').value;

  if(password !== confirm_password) {
    toastr.error("password does not match");
  }else {
  const url = "";

  fetch("https://parcelfiles.herokuapp.com/users/signup", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",                                                                                                                                                                                                                                                                                                                                                                                          
    },
  
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      address: document.getElementById("address").value,
    })

  })
    .then(res => console.log("this is ressjkk==>",res))
    .then(res =>  { 
    return false
      if (res.token) {
        fetch("https://parcelfiles.herokuapp.com/products/user",{
          headers:{
            'Authorization': res.token
          }
        })
        .then(res => res.json())
        .then(data => {
         if (data.role === "user") {
                localStorage.setItem("token", res.token);
                localStorage.setItem("userId", res.userId);
                localStorage.setItem("name", data.Name);
                window.location.href = "./user.html";
                toastr.success(res.msg);
              }
            })
    }
  })
    .catch();
};

    }
document
.querySelector("#signBtn")
.addEventListener("submit", signUp);
