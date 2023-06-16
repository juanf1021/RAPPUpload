let data;
window.addEventListener("load", async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/infoCont");
    if (response.ok) {
      data = await response.json();
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

function handleFocus(event) {
  let focusElement = event.target;
  let siblingDiv = focusElement.nextElementSibling;

  if (siblingDiv && siblingDiv.classList.contains("validateMessage")) {
    siblingDiv.style.display = "none";
  }

  focusElement.style.border = "none";
}

function validateForm() {
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var message = document.getElementById("message");
  if (name.value.trim() === "") {
    name.style.border = "0.125rem solid red";
    let siblingDiv = name.nextElementSibling;
    siblingDiv.style.display = "block";
    return false;
  }
  if (message.value.trim() === "") {
    message.style.border = "0.125rem solid red";
    let siblingDiv = message.nextElementSibling;
    siblingDiv.style.display = "block";
    return false;
  }

  if (email.value.trim() === "") {
    email.style.border = "0.125rem solid red";
    let siblingDiv = email.nextElementSibling;
    siblingDiv.style.display = "block";
    return false;
  }

  if (!validateEmail(email.value)) {
    return false;
  }

  sendEmail();
  return false;
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function reset() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("message").value = "";
}
function sendEmail() {
  Email.send({
    SecureToken: data[0].fields.token,
    To: "RAPPsuport@outlook.com",
    From: data[0].fields.email,
    Subject: "Mensaje Rapp",
    Body:
      "Nombre: " +
      document.getElementById("name").value +
      "<br> Email: " +
      document.getElementById("email").value +
      "<br> Telefono: " +
      document.getElementById("phone").value +
      "<br> Message: " +
      document.getElementById("message").value,
  }).then((message) => window.alert("Mensaje enviado"));
  reset();
}
