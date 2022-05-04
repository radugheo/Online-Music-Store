window.addEventListener("DOMContentLoaded", function(){
    var btn=document.getElementById("filtrare");
    btn.onclick=function(){
        var articole=document.getElementsByClassName("produs");
        for(let art of articole){
            art.style.display="none";
            var nume=art.getElementsByClassName("val-nume")[0];//<span class="val-nume">aa</span>
            console.log(nume.innerHTML)
            var conditie1=nume.innerHTML.startsWith(document.getElementById("inp-nume").value)

            var pret=art.getElementsByClassName("val-pret")[0]
            var conditie2=parseInt(pret.innerHTML) > parseInt(document.getElementById("inp-pret1").value);
            var conditie6=parseInt(pret.innerHTML) < parseInt(document.getElementById("inp-pret2").value);

            var conditie5 = false;
            var culoareArt = art.getElementsByClassName("val-culoare")[0].innerHTML;
            var checkboxes=document.getElementsByName("gr_chck");	
            var checkCh = 0;	
            for(let ch of checkboxes){
                if(ch.checked){
                    checkCh = 1;
                    if (ch.value == "10"){
                        if (culoareArt == "Galben"){
                            conditie5 = true;
                        }
                    }
                    if (ch.value == "20"){
                        if (culoareArt == "Rosu"){
                            conditie5 = true;
                        }
                    }
                    if (ch.value == "30"){
                        if (culoareArt == "Albastru"){
                            conditie5 = true;
                        }
                    }
                    if (ch.value == "40"){
                        if (culoareArt == "Alb"){
                            conditie5 = true;
                        }
                    }
                    if (ch.value == "50"){
                        if (culoareArt == "Negru"){
                            conditie5 = true;
                        }
                    }
                    if (ch.value == "60"){
                        if (culoareArt == "Roz"){
                            conditie5 = true;
                        }
                    }
                    if (ch.value == "70"){
                        if (culoareArt == "Maro"){
                            conditie5 = true;
                        }
                    }
                    if (ch.value == "80"){
                        if (culoareArt == "Visiniu"){
                            conditie5 = true;
                        }
                    }
                    if (ch.value == "90"){
                        if (culoareArt == "Gri"){
                            conditie5 = true;
                        }
                    }
                }
            }
            if (checkCh == 0){
                conditie5 = true;
            }
            var radbtns=document.getElementsByName("gr_rad");
            for (let rad of radbtns){
                if (rad.checked){
                    var valStangaci = rad.value;//poate fi 1 sau 2
                    break;
                }
            }

            var stangaciArt = art.getElementsByClassName("val-stangaci")[0].innerHTML;
            var conditie3 = false;
            switch (valStangaci){
                case "1":
                    if(stangaciArt == "true"){
                        conditie3 = true;
                    } 
                    break;
                case "2": 
                    if(stangaciArt == "false"){
                        conditie3 = true;
                    }     
                    break;
                default: conditie3 = true;
            }
            console.log(conditie3);

            var selCateg = document.getElementById("inp-categorie");
            var conditie4 = (art.getElementsByClassName("val-categorie")[0].innerHTML == selCateg.value || selCateg.value=="toate");

            if(conditie1 && conditie2 && conditie3 && conditie4 && conditie5 && conditie6)
                art.style.display="block";
            
        }
    }
    var rng=document.getElementById("inp-pret1");
    rng.onchange=function(){
        var info = document.getElementById("infoRange1");//returneaza null daca nu gaseste elementul
        if(!info){
            info=document.createElement("span");
            info.id="infoRange1"
            this.parentNode.appendChild(info);
        }
        info.innerHTML="("+this.value+")";
    }

    var rng=document.getElementById("inp-pret2");
    rng.onchange=function(){
        var info = document.getElementById("infoRange2");//returneaza null daca nu gaseste elementul
        if(!info){
            info=document.createElement("span");
            info.id="infoRange2"
            this.parentNode.appendChild(info);
        }
        info.innerHTML="("+this.value+")";
    }

    function sorteaza(semn){
        var articole=document.getElementsByClassName("produs");
        var v_articole=Array.from(articole);
        v_articole.sort(function(a,b){
            var pret_a=parseInt(a.getElementsByClassName("val-pret")[0].innerHTML);
            var pret_b=parseInt(b.getElementsByClassName("val-pret")[0].innerHTML);
            if(pret_a != pret_b){
                return semn*(pret_a - pret_b);
            }
            else{
                var nume_a=a.getElementsByClassName("val-nume")[0].innerHTML;
                var nume_b=b.getElementsByClassName("val-nume")[0].innerHTML;
                return semn*nume_a.localeCompare(nume_b);
            }
        });
        for(let art of v_articole){
            art.parentNode.appendChild(art);
        }
    }

    var btn2=document.getElementById("sortCrescPret");
    btn2.onclick=function(){
        sorteaza(1)
    }

    var btn3=document.getElementById("sortDescrescPret");
    btn3.onclick=function(){
        sorteaza(-1)
    }

    document.getElementById("resetare").onclick=function(){
        document.getElementById("i_rad3").checked = true;
        document.getElementById("inp-pret1").value = document.getElementById("inp-pret1").min;
        document.getElementById("infoRange1").innerHTML = "(" + document.getElementById("inp-pret1").min + ")";
    
        document.getElementById("inp-pret2").value = document.getElementById("inp-pret2").max;
        document.getElementById("infoRange2").innerHTML = "(" + document.getElementById("inp-pret2").max + ")";

        document.getElementById("inp-categorie").value = "toate";
        //resetare articole
        var articole = document.getElementsByClassName("produs");
        for(let art of articole){
            art.style.display="block";
        }
    }
    
    // -------------------- selectare produse cos virtual----------------------------------
    /*
        indicatie pentru cand avem cantitati
        fara cantitati: "1,2,3,4" //1,2,3,4 sunt id-uri
        cu cantitati:"1:5,2:3,3:1,4:1" // 5 produse de tipul 1, 3 produse de tipul 2, 1 produs de tipul 3...
        putem memora: [[1,5],[2,3],[3,1],[4,1]]// un element: [id, cantitate]

    */
    ids_produse_init=localStorage.getItem("produse_selectate");
    if(ids_produse_init)
        ids_produse_init=ids_produse_init.split(",");//obtin vectorul de id-uri ale produselor selectate  (din cosul virtual)
    else
        ids_produse_init=[]

    var checkboxuri_cos = document.getElementsByClassName("select-cos");
    for (let ch of checkboxuri_cos){
        if (ids_produse_init.indexOf(ch.value)!=-1)
            ch.checked=true;
        ch.onchange=function(){
            ids_produse=localStorage.getItem("produse_selectate")
            if(ids_produse)
                ids_produse=ids_produse.split(",");
            else
                ids_produse=[]
            console.log("Selectie veche:", ids_produse);
            //ids_produse.map(function(elem){return parseInt(elem)});
            //console.log(ids_produse);
            if(ch.checked){
                ids_produse.push(ch.value);//adaug elementele noi, selectate (bifate)
            }
            else{
                ids_produse.splice(ids_produse.indexOf(ch.value), 1) //sterg elemente debifate
            }
            console.log("Selectie noua:",ids_produse);
            localStorage.setItem("produse_selectate",ids_produse.join(","))
        }
    }
 });


 window.onkeydown=function(e){
    console.log(e);
    if(e.key=="c" && e.altKey==true){
        var suma=0;
        var articole=document.getElementsByClassName("produs");
        for(let art of articole){
            if(art.style.display!="none")
                suma+=parseFloat(art.getElementsByClassName("val-pret")[0].innerHTML);
        }

        var spanSuma;
        spanSuma=document.getElementById("numar-suma");
        if(!spanSuma){
            spanSuma=document.createElement("span");
            spanSuma.innerHTML=" Suma:"+suma;//<span> Suma:...
            spanSuma.id="numar-suma";//<span id="..."
            document.getElementById("p-suma").appendChild(spanSuma);
            setTimeout(function(){document.getElementById("numar-suma").remove()}, 1500);
        }
    }


 }