const express= require("express");
const fs = require("fs");
const sharp = require("sharp");
const ejs = require("ejs");
const { render } = require("express/lib/response");
const res = require("express/lib/response");
const { nextTick } = require("process");
const {Client}=require("pg");

var client = new Client({database:"RMusic", user:"user1", password:"user1", host:"localhost", port:5432});
client.connect();

app= express();

app.set("view engine","ejs");

app.use("/resurse", express.static(__dirname+"/resurse"))

console.log("Director proiect:",__dirname);

app.use("/*", function(req, res, next){
    res.locals.propGenerala = "Sponsored by Steaua Bucuresti (FCSB)";
    next();
});

app.get(["/", "/index", "/home"], function(req, res){
    res.render("pagini/index", {ip:req.ip, imagini:obImagini.imagini});
});                                                                              

/*app.get("/produse", function(req, res){
    client.query("select * from produse", function(err, rezQuery){
        res.render("pagini/produse", {produse: rezQuery.rows});

    });
});*/

app.get("/produse", function(req, res){
    client.query("select * from unnest(enum_range(null::categ_instrument))", function(err, rezCateg){
        var cond_where=req.query.tip ?  categorie='${req.query.tip}'  : "1=1"
        client.query("select * from produse where "+ cond_where, function(err, rezQuery){
            res.render("pagini/produse", {produse: rezQuery.rows, optiuni: rezCateg.rows});
        });
    });
  });

app.get("/produs/:id", function(req, res){
    client.query(`select * from produse where id= ${req.params.id}`, function(err, rezQuery){
        res.render("pagini/produs", {prod: rezQuery.rows[0]});
    });
});


app.get("/galerie", function(req, res){
     res.render("pagini/galerie", {imagini:obImagini.imagini});
});

app.get("/*.ejs", function(req, res){
    randeazaEroare(res, 403, true);
});

app.get("/*", function(req, res){
    res.render("pagini"+req.url, function(err, rezRender){
        if (err){
            if(err.message.includes("Failed to lookup view")){
                //res.status(404).render("pagini/404");
                randeazaEroare(res, 404, true);
            }
            else{
                randeazaEroare(res, 1, true);
            }
        }
        else{
            res.send(rezRender);
        }
    });
    res.end();
});

function creeazaImagini(){
    var buf=fs.readFileSync(__dirname+"/resurse/json/galerie.json").toString("utf8");
    obImagini=JSON.parse(buf);
    for (let imag of obImagini.imagini){
        let nume_imag, extensie;
        [nume_imag, extensie]=imag.fisier.split(".")
        let dim_mic=150
        
        imag.mic=`${obImagini.cale_galerie}/mic/${nume_imag}-${dim_mic}.webp` //nume-150.webp // "a10" b=10 "a"+b `a${b}`
        imag.mare=`${obImagini.cale_galerie}/${imag.fisier}`;
        if (!fs.existsSync(imag.mic))
            sharp(__dirname+"/"+imag.mare).resize(dim_mic).toFile(__dirname+"/"+imag.mic);

        
        let dim_mediu = 250    
        imag.mediu=`${obImagini.cale_galerie}/mediu/${nume_imag}-${dim_mediu}.webp`
        if (!fs.existsSync(imag.mediu))
            sharp(__dirname+"/"+imag.mare).resize(dim_mediu).toFile(__dirname+"/"+imag.mediu);
    }
}

creeazaImagini();

function creeazaErori(){
    var buf=fs.readFileSync(__dirname+"/resurse/json/erori.json").toString("utf8");
    obErori=JSON.parse(buf);
}

function randeazaEroare(res, identificator, status, titlu, text, imagine){
    var eroare = obErori.erori.find(function(elem){ return elem.identificator == identificator; });
    if(status){
        res.status(identificator).render("pagini/eroaregenerala", {titlu: eroare.titlu, text: eroare.text, imagine: obErori.cale_baza + "/" + eroare.imagine});
    }

    else{
        let titlu = titlu || eroare.titlu;
        let text = text ||  eroare.text;
        if(eroare) 
            imagine = imagine || obErori.cale_baza+"/"+eroare.imagine;
        else
            imagine="resurse/img/erori/lupa.png";
        res.render("pagini/eroaregenerala", {titlu:eroare.titlu, text:eroare.text, imagine:imagine});
    }
}

creeazaErori();


//app.listen(8080);
var s_port=process.env.PORT || 8080;
app.listen(s_port);
console.log("A pornit");