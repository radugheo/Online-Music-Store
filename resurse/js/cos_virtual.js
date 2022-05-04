window.addEventListener("load",function(){
// 	var myHeaders = new Headers();
// myHeaders.append();
	var prod_sel=localStorage.getItem("produse_selectate")


	if (prod_sel){ //p.then(f1).then(f2).then(f3)
		var vect_ids=prod_sel.split(",");
		fetch("/produse_cos", {		

			method: "POST",
			headers:{'Content-Type': 'application/json'},
			
			mode: 'cors',		
			cache: 'default',
			body: JSON.stringify({
				ids_prod: vect_ids,

				a:10
			})
		})
		.then(function(rasp){ console.log(rasp); x=rasp.json(); console.log(x); return x})
		.then(function(objson) {
	
			console.log(objson);
			for (let prod of objson){
				let divCos=document.createElement("div");
				divCos.classList.add("cos-virtual")
				let divImagine=document.createElement("div");
				let imag=document.createElement("img");
				imag.src="/resurse/imagini/produse/"+prod.imagine;
				divImagine.appendChild(imag);
				divCos.appendChild(divImagine);
				let divInfo=document.createElement("div");
				divInfo.innerHTML=`<p><b>${prod.nume}</b></p><p>Pret: ${prod.pret}</p><p>Gramaj: ${prod.gramaj}</p>`;
				divCos.appendChild(divInfo);
				document.getElementsByTagName("main")[0].insertBefore(divCos, document.getElementById("cumpara"));
			}
	
		}
		).catch(function(err){console.log(err)});




		document.getElementById("cumpara").onclick=function(){
			var vect_ids=localStorage.getItem("produse_selectate").split(",");
			fetch("/cumpara", {		
	
				method: "POST",
				headers:{'Content-Type': 'application/json'},
				
				mode: 'cors',		
				cache: 'default',
				body: JSON.stringify({
					ids_prod: vect_ids,
					a:10
				})
			})
			.then(function(rasp){ console.log(rasp); return rasp.text()})
			.then(function(raspunsText) {
		   
				console.log(raspunsText);
	
				let p=document.createElement("p");
				p.innerHTML=raspunsText;
				document.getElementsByTagName("main")[0].innerHTML="";
				document.getElementsByTagName("main")[0].appendChild(p)
				if(!raspunsText.includes("nu sunteti logat"))
					localStorage.removeItem("produse_selectate");
		   
			}
			).catch(function(err){console.log(err)});
		}
	}
	else{
		document.getElementsByTagName("main")[0].innerHTML="<p>Nu aveti nimic in cos!</p>";
	}
	
	
});