const express = require("express");
const fs = require("fs");
const sharp = require("sharp");
const ejs = require("ejs");
const { render } = require("express/lib/response");
const res = require("express/lib/response");
const { nextTick } = require("process");
const { Client } = require("pg");
const formidable = require("formidable");
const crypto = require("crypto");
const session = require("express-session");
const nodemailer = require("nodemailer");
const path = require("path");
const obGlobal = {
    obImagini: null,
    obErori: null,
    emailServer: "rmusic362tw@gmail.com",
    appPort: 8080,
    sirNum: "",
    sirAlpha: "",
    protocol: null,
    numeDomeniu: null
};
if (process.env.SITE_ONLINE){
    obGlobal.protocol = "https://";
    obGlobal.numeDomeniu = "rmusic362.herokuapp.com";
    var client = new Client({
        database:"dbmpap1l51mg77", 
        user:"mlmgnxvalvzezg", 
        password:"bc0687846e13aabfe2f36d96a44a7592808c8a4c55490e4c1358f66a1d20d1e5", 
        host:"ec2-3-224-164-189.compute-1.amazonaws.com", 
        port:5432, 
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else{
    obGlobal.protocol = "http://";
    obGlobal.numeDomeniu = "localhost:" + obGlobal.appPort;
    var client = new Client({
        database:"RMusic", 
        user:"user1", 
        password:"user1", 
        host:"localhost", 
        port:5432
    });
}
client.connect();
foldere = ["temp", "img_users"];
for (let folder of foldere){
    let cale = path.join(__dirname, folder);
    if (!fs.existsSync(cale))
        fs.mkdirSync(cale);
}
app = express();
app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}));
app.set("view engine","ejs");
app.use("/resurse", express.static(__dirname+"/resurse"));
app.use("/img_users", express.static(__dirname+"/img_users"));
console.log("Director proiect:",__dirname);
async function trimiteMail(email, subiect, mesajText, mesajHtml, atasamente=[]){
    var transp = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth:{
            user: obGlobal.emailServer,
            pass: "wlxhjytcjccysvzk"
        },
        tls:{
            rejectUnauthorized:false
        }
    });
    await transp.sendMail({
        from: obGlobal.emailServer,
        to: email,
        subject: subiect,
        text: mesajText, 
        html: mesajHtml,
        attachments: atasamente
    })
    console.log("A trimis mail.");
}
app.use("/*", function(req, res, next){
    res.locals.propGenerala = "Sponsored by Steaua Bucuresti (FCSB)";
    res.locals.utilizator = req.session.utilizator;
    res.locals.mesajLogin = req.session.mesajLogin;
    req.session.mesajLogin = "";
    next();
});
app.get(["/", "/index", "/home"], function(req, res){
    res.render("pagini/index", {ip:req.ip, imagini:obImagini.imagini});
});    
app.get("/produse", function(req, res){
    client.query("select * from unnest(enum_range(null::categ_instrument))", function(err, rezCateg){
        var cond_where = req.query.tip ?  categorie='${req.query.tip}'  : "1=1"
        client.query("select * from produse where " + cond_where, function(err, rezQuery){
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
/*-----------------utilizatori-----------------*/
intervaleAscii1 = [48, 57];
obGlobal.sirNum = "";
for (let i=intervaleAscii1[0]; i<=intervaleAscii1[1]; i++){
    obGlobal.sirNum += String.fromCharCode(i);
}
intervaleAscii2 = [65, 80];
obGlobal.sirAlpha = "";
for (let i=intervaleAscii2[0]; i<=intervaleAscii2[1]; i++){
    obGlobal.sirAlpha += String.fromCharCode(i);
}
function genereazaToken1(lungime){
    var token = "";
    for (let i=0; i<lungime; i++){
        token += obGlobal.sirNum[Math.floor(Math.random()*obGlobal.sirNum.length)];
    }
    return token;
}
function genereazaToken2(lungime){
    var token = "";
    for (let i=0; i<lungime; i++){
        token += obGlobal.sirAlpha[Math.floor(Math.random()*obGlobal.sirAlpha.length)];
    }
    return token;
}
parolaServer = "tehniciweb";
app.post("/inreg", function(req, res){
    var username;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var eroare = "";
        if(fields.username == ""){
            eroare += "Username necompletat. ";
        }
        if(!fields.username.match(new RegExp("^[A-Za-z0-9]+$"))){
            eroare += "Username invalid. ";
        }
        if(fields.parola == ""){
            eroare += "Parola necompletata. ";
        }
        if(fields.rparola == ""){
            eroare += "Nu ai confirmat parola. ";
        }
        if(fields.email == ""){
            eroare += "Email necompletat. ";
        }
        /*if(fields.email.match(new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}'))){
            eroare += "Email invalid. ";
        }*/
        if (!eroare){
            queryUtilizator = `select username from utilizatori where username='${fields.username}'`;
            client.query(queryUtilizator, function(err, rezUtilizator){
                if(rezUtilizator.rows.length != 0){
                    eroare += "Username deja existent. ";
                    res.render("pagini/inregistrare", {err: "Eroare: " + eroare});
                }
                else{
                    var hash = crypto.scryptSync(fields.parola, parolaServer, 64).toString('hex');
                    var token1 = genereazaToken1(10);
                    var token2 = fields.username + "-" + genereazaToken2(70);
                    console.log(token2);
                    var comandaInserare = `insert into utilizatori (username, nume, prenume, email, parola, culoare_chat, cod) values ('${fields.username}', '${fields.nume}', '${fields.prenume}', '${fields.email}', '${hash}', '${fields.culoare_chat}', '${token2}')`;
                    client.query(comandaInserare, function(err, rezQuery){
                        if(err){
                            console.log(err);
                            res.render("pagini/inregistrare", {err: "Eroare baza de date"});
                        }
                        else{
                            res.render("pagini/inregistrare", {raspuns: "Inregistrare cu succes"});          
                            var linkConfirmare = `${obGlobal.protocol}${obGlobal.numeDomeniu}/confirmare_inreg/${token1}/${fields.username}/${token2}`;
                            trimiteMail(fields.email, "Inregistrare cu succes", "Username-ul tau este " + fields.username, `<h1>Salut!</h1><p style='color:blue'>Username-ul tau este ${fields.username}.</p><p>Link pentru confirmare: <a href='${linkConfirmare}'>${linkConfirmare}</a></p>`);
                        }
                    });
                }
            });
        }
        else{
            res.render("pagini/inregistrare", {err: "Eroare: " + eroare});
        }
    });
    form.on("field", function(nume, val){
        console.log("---" + nume + ": " + val);
        if (nume == "username"){
            username = val;
        }
    });
    form.on("fileBegin", function(nume, fisier){
        console.log("fileBegin");
        caleUtilizator = path.join(__dirname, "img_users", username);
        if (!fs.existsSync(caleUtilizator)){
            fs.mkdirSync(caleUtilizator);
        }
        fisier.filepath = path.join(caleUtilizator, fisier.originalFilename);
        console.log(nume, fisier);
    });
    form.on("file", function(nume, fisier){
        console.log("Fisierul " + fisier.name + " a fost incarcat.");
    });
});
app.get("/confirmare_inreg/:token1/:username/:token2", function(req, res){
    var comandaUpdate = `update utilizatori set confirmat_mail = true where username='${req.params.username}'`;
    client.query(comandaUpdate, function(err, rezQuery){
        if(err){
            console.log(err);
            randeazaEroare(res, 2);
        }
        else{
            if(rezQuery.rowCount == 1){
                res.render("pagini/confirmare");
            }
            else{
                randeazaEroare(res, 2, "Eroare link confirmare", "Utilizatorul nu exista");
            }
        }
    });
}
);
app.post("/login", function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var hash = crypto.scryptSync(fields.parola, parolaServer, 64).toString('hex');
        var comandaSelect = `select * from utilizatori where username='${fields.username}' and parola='${hash}' and confirmat_mail=true`;
        client.query(comandaSelect, function(err, rezQuery){
            if(err){
                console.log(err);
                randeazaEroare(res, 2);
            }else{
                if (rezQuery.rows.length == 1){
                    req.session.utilizator = {
                        nume: rezQuery.rows[0].nume,
                        prenume: rezQuery.rows[0].prenume,
                        email: rezQuery.rows[0].email,
                        username: rezQuery.rows[0].username,
                        rol: rezQuery.rows[0].rol,
                        culoare_chat: rezQuery.rows[0].culoare_chat                       
                    };
                    res.redirect("/index");
                }
                else{
                    req.session.mesajLogin = "Username sau parola incorecte";
                    res.redirect("/index");
                }
            }
        });
    });
});
app.post("/profil", function(req, res){
    if(!req.session.utilizator){
        res.render("pagini/eroare_generala", {text: "Nu sunteti logat."});
        return;
    }
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var hash = crypto.scryptSync(fields.parola, parolaServer, 64).toString('hex');
        var queryUpdate = `update utilizatori set nume='${fields.nume}', prenume='${fields.prenume}', email='${fields.email}', culoare_chat='${fields.culoare_chat}' where parola='${hash}'`;
        client.query(queryUpdate, function(err, rezQuery){
            if(err){
                console.log(err);
                res.render("pagini/eroare_generala", {text: "Eroare baza de date. Incearca din nou."});
                return;
            }
            if(rezQuery.rowCount == 0){
                res.render("pagini/eroare_generala", {text: "Nu s-au putut actualiza datele."});
                return;
            }
            else{
                req.session.utilizator.nume = fields.nume;
                req.session.utilizator.prenume = fields.prenume;
                req.session.utilizator.email = fields.email;
                req.session.utilizator.culoare_chat = fields.culoare_chat;
            }
            res.render("pagini/profil", {mesaj: "Actualizare cu succes."});
        });
    });
});
app.get("/logout", function(req, res){
    req.session.destroy();
    res.locals.utilizator = null;
    res.render("pagini/logout");
});
app.get("/*.ejs", function(req, res){
    randeazaEroare(res, 403, true);
});
app.get("/*", function(req, res){
    res.render("pagini" + req.url, function(err, rezRender){
        if (err){
            if(err.message.includes("Failed to lookup view")){
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
    var buf = fs.readFileSync(__dirname+"/resurse/json/galerie.json").toString("utf8");
    obImagini = JSON.parse(buf);
    for (let imag of obImagini.imagini){
        let nume_imag, extensie;
        [nume_imag, extensie] = imag.fisier.split(".")
        let dim_mic = 150
        imag.mic = `${obImagini.cale_galerie}/mic/${nume_imag}-${dim_mic}.webp` //nume-150.webp // "a10" b=10 "a"+b `a${b}`
        imag.mare = `${obImagini.cale_galerie}/${imag.fisier}`;
        if (!fs.existsSync(imag.mic))
            sharp(__dirname + "/" + imag.mare).resize(dim_mic).toFile(__dirname+"/" + imag.mic);
        let dim_mediu = 250    
        imag.mediu = `${obImagini.cale_galerie}/mediu/${nume_imag}-${dim_mediu}.webp`
        if (!fs.existsSync(imag.mediu))
            sharp(__dirname + "/" + imag.mare).resize(dim_mediu).toFile(__dirname+"/" + imag.mediu);
    }
}
creeazaImagini();
function creeazaErori(){
    var buf = fs.readFileSync(__dirname+"/resurse/json/erori.json").toString("utf8");
    obErori = JSON.parse(buf);
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
var s_port=process.env.PORT || obGlobal.appPort;
//app.listen(s_port);
app.listen(obGlobal.appPort);
console.log("A pornit");