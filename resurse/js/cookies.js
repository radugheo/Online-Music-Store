/*
Functii preluate de pe 
https://www.w3schools.com/js/js_cookies.asp
si modificate */
window.addEventListener("DOMContentLoaded", function(){
    checkCookie();
    console.log("aici");

})

function setCookie(cname, cvalue, timp_expirare) {//timp_expirare masurat in milisecunde
    const d = new Date();
    d.setTime(d.getTime() + timp_expirare);
    let expires = "expires="+d.toUTCString();
    let stringCookie=cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log(stringCookie);
    document.cookie = stringCookie;
    console.log(document.cookie)
  }
  
  function getCookie(cname) {//returneaza valoarea cookie-ului cu numele cname
    let name = cname + "=";
    let ca = document.cookie.split(';');//vectorul de stringuri de forma nume_cookie=valoare_cookie
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];//elementul curent
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }//c.trim()
      if (c.indexOf(name) == 0) {//se putea folosi si startsWith
        return c.substring(name.length, c.length);//preia subsirul cu valoarea
      }
    }
    return "";
  }
  
  function checkCookie() {
    let acc_cookie = getCookie("acceptat_banner");
    if (acc_cookie) { //sirul vid e evaluat la fals intr-o expresie booleana
      document.getElementById("banner").style.display="none";
    } else {
        document.getElementById("banner").style.display="block";
        document.getElementById("ok_cookies").onclick=function(){
            setCookie("acceptat_banner", true, 5000);
            //setCookie("test", "ceva", 5000);
            document.getElementById("banner").style.display="none";
          }
      
    }
  } 

function deleteCookie(nume){//presupunem path =/
    document.cookie=nume+"="+";expires=" + new Date().toUTCString() + ";path=/"
}
