// CONTACT FORM //////////////////////////////////////////////////////////////////////////////////////////////
const submitButton = <HTMLInputElement> document.getElementById('submit-btn');
const url = 'https://yvafmdg0sa.execute-api.eu-west-2.amazonaws.com/prod/new_enquiry';
const emailInput = <HTMLInputElement> document.getElementById('email-input');
const nameInput = <HTMLInputElement> document.getElementById('name-input');

const checkContactForm = () => {
  submitButton.disabled = !emailInput.value|| !emailInput.validity.valid || !nameInput.value;
};

const submitContactForm = () => {
  submitButton.disabled = true;
  const xhttp = new XMLHttpRequest();
  const payload = {email: emailInput.value, name: nameInput.value};
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        handleSubmitSuccess()
      } else {
        console.log(this.response);
      }
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(payload));
};

const handleSubmitSuccess = () => {
  window.location.href = "/";
};

// add event listeners for input and button
nameInput.addEventListener('keyup', () => checkContactForm());
emailInput.addEventListener('keyup', () => checkContactForm());
submitButton.addEventListener('click', () => submitContactForm());
