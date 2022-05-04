/*a=10
var raspuns=confirm("Iti place tehnici web?");

console.log(raspuns)*/



window.addEventListener("load", function(){

    var rng=document.getElementById("inp-pret");
	rng.parentNode.insertBefore(document.createTextNode(rng.min),rng);
	rng.parentNode.appendChild(document.createTextNode(rng.max));
    let spval=document.createElement("span");
	rng.parentNode.appendChild(spval)
    rng.value=0;
    spval.innerHTML=" ("+rng.value+")";
    rng.onchange=function(){
        rng.nextSibling.nextSibling.innerHTML=" ("+this.value+")";
    }

    let btn=document.getElementById("filtrare");
    btn.onclick=function(){
        let inp=document.getElementById("inp-calorii");
        let maxCalorii = inp.value

        
        inp=document.getElementById("inp-pret");
        let minPret=inp.value

        let sel=document.getElementById("inp-categorie");
        let categorieSel=sel.value


        var produse=document.getElementsByClassName("produs");
    
        for (let prod of produse){
            prod.style.display="none";
            let calorii= parseInt(prod.getElementsByClassName("val-calorii")[0].innerHTML)
            let conditie1= calorii<=maxCalorii

            
            let pret= parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML)
            let conditie2= pret>=minPret

            let categorieArt= prod.getElementsByClassName("val-categorie")[0].innerHTML
            let conditie3= (categorieArt==categorieSel || categorieSel=="toate");

            let conditieFinala=conditie1 && conditie2 && conditie3;
            if (conditieFinala)
                prod.style.display="block";
        }
    }


    function sortArticole(factor){
        
        var produse=document.getElementsByClassName("produs");
        let arrayProduse=Array.from(produse);
        arrayProduse.sort(function(art1,art2){
            let nume1=art1.getElementsByClassName("val-nume")[0].innerHTML;
            let nume2=art2.getElementsByClassName("val-nume")[0].innerHTML;
            return factor*nume1.localeCompare(nume2);
            /*
            let rez=factor*nume1.localeCompare(nume2)
            if (rez==0)
                retrun factor*(pret1-pret2)
            return rez;
            */
        });
        console.log(arrayProduse); 
        for (let prod of arrayProduse){
            prod.parentNode.appendChild(prod);
        }
    }

    btn=document.getElementById("sortCrescNume");
    btn.onclick=function(){
        sortArticole(1);
    }
    btn=document.getElementById("sortDescrescNume");
    btn.onclick=function(){
        sortArticole(-1);
    }

    btn=document.getElementById("resetare");
    btn.onclick=function(){
        
        var produse=document.getElementsByClassName("produs");
    
        for (let prod of produse){
            prod.style.display="block";
        }
    }



    window.onkeydown=function(e){
        
       
        if (e.key=="c" && e.altKey){
            e.preventDefault();
            var produse=document.getElementsByClassName("produs");
            sumaArt=0;
            for (let prod of produse){
                sumaArt+=parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
            }
            let infoSuma=document.createElement("p");//<p></p>
            infoSuma.innerHTML="Suma: "+sumaArt;//<p>...</p>
            infoSuma.className="info-produse";
            let p=document.getElementById("p-suma")
            p.parentNode.insertBefore(infoSuma,p.nextSibling);
            setTimeout(function(){infoSuma.remove()}, 2000);
        }
    }

    ids_produse_init=localStorage.getItem("produse_selectate");
    if(ids_produse_init)
        ids_produse_init=ids_produse_init.split(",");
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
            console.log(ids_produse);
            //ids_produse.map(function(elem){return parseInt(elem)});
            //console.log(ids_produse);
            if(ch.checked){
                ids_produse.push(ch.value);
            }
            else{
                ids_produse.splice(ids_produse.indexOf(ch.value), 1)
            }
            console.log(ids_produse);
            localStorage.setItem("produse_selectate",ids_produse.join(","))
        }
    }

});