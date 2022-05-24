 window.onload= function(){
    var formular=document.getElementById("form_inreg");
    if(formular){
        formular.onsubmit = function(){
            if(document.getElementById("parl").value != document.getElementById("rparl").value){
                alert("Passwords don't match.");
                return false;
            }
            return true;
        }
    }
 }