function passwordChecker(){

  var password = document.passwordForm.password.value;
  var check = document.passwordForm.passwordCheck.value;

  if(password!=check){

      document.getElementById("firstPassword").setAttribute("class","form-control is-invalid");

      document.getElementById("confirmPassword").setAttribute("class","form-control is-invalid");

      document.getElementById("passwordMessage").innerHTML="<small class='text-danger'>Passwords don't match</small>"

      document.getElementById("savePassword").disabled=true;     

  }else{

      document.getElementById("firstPassword").setAttribute("class","form-control is-valid");

      document.getElementById("confirmPassword").setAttribute("class","form-control is-valid");

      document.getElementById("passwordMessage").innerHTML="<div></div>"

      document.getElementById("savePassword").disabled=false;
  }

}

function emailChecker(){

  var email = document.emailForm.email.value;
  var check = document.emailForm.emailCheck.value;

  if(email!=check){

      document.getElementById("firstEmail").setAttribute("class","form-control is-invalid");

      document.getElementById("confirmEmail").setAttribute("class","form-control is-invalid");

      document.getElementById("emailMessage").innerHTML="<small class='text-danger'>E-mails don't match</small>"

      document.getElementById("saveEmail").disabled=true;     

  }else{

      document.getElementById("firstEmail").setAttribute("class","form-control is-valid");

      document.getElementById("confirmEmail").setAttribute("class","form-control is-valid");

      document.getElementById("emailMessage").innerHTML="<div></div>"

      document.getElementById("saveEmail").disabled=false;
  }

}