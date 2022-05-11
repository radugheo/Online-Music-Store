window.addEventListener("DOMContentLoaded", function(){
    var tema = localStorage.getItem("tema");
    if(!tema){
        localStorage.setItem("tema", "light");
    }
    else{
        if(tema == "dark")
            document.body.classList.add("dark");
    }
    btn = document.getElementById("btn_tema");
    if(btn){
        btn.onclick = function(){
            document.body.classList.toggle("dark");
            if(document.body.classList.contains("dark"))
                localStorage.setItem("tema", "dark");
            else
                localStorage.setItem("tema", "light");
        }
    }
});

