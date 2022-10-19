const express = require("express");
const app = express();
const mysql = require("mysql2");
var bodyParser = require("body-parser");
const { request } = require("express");
const { type } = require("os");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "N0M3L0",
  database: "node"
});

con.connect();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static('public'));

app.post('/agregarUsuario', (req, res) => {

  let nombre = req.body.nombre;
  let energia = req.body.energia;
  let aldea = req.body.aldea;

  if(nombre == "" || energia == "" || aldea ==""){
    return res.send(`<a href="index.html">Inicio</a>`);
  }
  else{
    con.query('INSERT INTO personaje(nom_per,ene_per,ald_per) values("' + nombre + '","'+ energia +'","'+aldea+'")',(err, respuesta, fields) => {
      
    console.log(nombre,energia,aldea)

    return res.send(`<a href="index.html">Inicio</a>
                    <h3>Personaje: ${nombre}</h3><br><h3>Energia: ${energia}</h3><h3>Aldea: ${aldea}</h3>`);
    
    });
  }

  
})

app.get('/getUsuarios', (req, res) => {

  con.query("Select *FROM personaje", (err, respuesta, field) => {
    
    var userHTML = ``;
    console.log(respuesta);
    respuesta.forEach(user=> {
      userHTML += `<tr><td>${user.id_per}</td><td>${user.nom_per}</td><td>${user.ene_per}</td><td>${user.ald_per}</td></tr>`
    });


    return res.send(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="./css/index.css" />
          <title>Hinata</title>
        </head>
        <body>
          <div class="consulta">
            <a href="/casiEliminarUsuarios"><div class="uchiha"></div></a>
            <a href="./index.html"><div class="uzumaki"></div></a>
            <div class="tituloConsultar">Consultar</div>
            <div class="contenedorTabla1">
              <table class="tabla1">
                <tr>
                  <th class="izquierda">ID</th>
                  <th class="borde">Nombre</th>
                  <th class="borde">Energia</th>
                  <th class="derecha">Aldea</th>
                </tr>
                ${userHTML}
              </table>
            </div>
          </div>
        </body>
      </html>`
    );
  });
});

app.get('/casiEliminarUsuarios', (req, res) => {

  con.query("SELECT * FROM personaje", (err, respuesta, field) => {
    if (err) return console.log("Error", err);
    var userHTML = ``;
    var i = 0;
    console.log(respuesta);
    respuesta.forEach(user=> {
      userHTML += `<tr><td>${user.id_per}</td><td>${user.nom_per}</td><td>${user.ene_per}</td><td>${user.ald_per}</td></tr>`
    });


    return res.send(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="./css/index.css" />
          <title>Itachi</title>
        </head>
        <body>
          <div class="eliminar">
            <a href="/getUsuarios"><div class="hyuga"></div></a>
            <a href="./index.html"><div class="uzumaki"></div></a>
            <div class="tituloEliminar">Eliminar</div>
            <div class="contenedorTabla2">
              <table class="tabla2">
                <tr>
                  <th class="izquierda">ID</th>
                  <th class="borde">Nombre</th>
                  <th class="borde">Energia</th>
                  <th class="derecha">Aldea</th>
                </tr>
                ${userHTML}
              </table>
            </div>
            <form action="/eliminarUsuario" method="post">
              <div class="contenedorTabla3">
                <input class="inputEliminar" name="id" type="number" onkeypress="return SoloNumeros(event);" placeholder="ID"><input type="submit" value="Eliminar" class="botonEliminar">
              </div>
            </form>
          </div>
        </body>
      </html>`)
  })
})

app.post("/eliminarUsuario", (req, res) => {

    let id = req.body.id;
    
    con.query("DELETE FROM personaje WHERE id_per="+id+";")

      return res.send(
        "Usuario eliminado"
      );
    
});

app.listen(3000, () => {
  console.log("Servidor escuchando el puerto 3000 en http://localhost:3000")
})
/*
npm install express --save
*/
