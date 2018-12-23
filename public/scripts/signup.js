  function setUser(){
    document.getElementById("accType").setAttribute("value","user");
  }

  function setDev(){
    document.getElementById("accType").setAttribute("value","developer");
  }

  function passwordChecker(){

  var password = document.registrationForm.password.value;
  var check = document.registrationForm.passwordCheck.value;

  if(password!=check){

      document.getElementById("firstPassword").setAttribute("class","form-control is-invalid");

      document.getElementById("confirmPassword").setAttribute("class","form-control is-invalid");

      document.getElementById("passwordMessage").innerHTML="<small class='text-danger'>Passwords don't match</small>"

      document.getElementById("submitButton").disabled=true;     

  }else{

      document.getElementById("firstPassword").setAttribute("class","form-control is-valid");

      document.getElementById("confirmPassword").setAttribute("class","form-control is-valid");

      document.getElementById("passwordMessage").innerHTML="<div></div>"

      document.getElementById("submitButton").disabled=false;
  }

}

function emailChecker(){

  var email = document.registrationForm.email.value;
  var check = document.registrationForm.emailCheck.value;

  if(email!=check){

      document.getElementById("firstEmail").setAttribute("class","form-control is-invalid");

      document.getElementById("confirmEmail").setAttribute("class","form-control is-invalid");

      document.getElementById("emailMessage").innerHTML="<small class='text-danger'>E-mails don't match</small>"

      document.getElementById("submitButton").disabled=true;     

  }else{

      document.getElementById("firstEmail").setAttribute("class","form-control is-valid");

      document.getElementById("confirmEmail").setAttribute("class","form-control is-valid");

      document.getElementById("emailMessage").innerHTML="<div></div>"

      document.getElementById("submitButton").disabled=false;
  }

}