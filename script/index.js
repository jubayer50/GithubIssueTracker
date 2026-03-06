const btnLogin = document.getElementById("btn-login");

btnLogin.addEventListener("click", () => {
  // get the element of input username
  const inputNameElement = document.getElementById("input-name");
  const inputNameValue = inputNameElement.value;

  // get the element of input user password
  const inputPasswordElement = document.getElementById("input-password");
  const inputPasswordValue = inputPasswordElement.value;

  if (inputNameValue === "") {
    alert("Give user ame");
    return;
  }

  if (inputNameValue !== "admin") {
    alert("Invalid Username");
    return;
  }

  if (inputPasswordValue !== "admin123") {
    alert("Invalid Password");
    return;
  }

  if (inputNameValue === "admin" && inputPasswordValue === "admin123") {
    alert("Login Successful");
    window.location.assign("home.html");
  }
});
