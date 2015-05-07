var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')
var app = express();


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var connection = mysql.createConnection({

    host: '127.12.103.2',
    user: 'admin3TDXADp', 
    password: '2zPDw2A-GMyZ',
    database: 'fullstack'

});

connection.connect(function(err) {
      if (err) {
        console.error('Conection error : ' + err.stack);
        return;
      }
      console.log('Connection with success as ID' + connection.threadId);
});


app.get('/contactlist', function(req, res) {

    connection.query('SELECT * FROM tblcontact', function(err, docs) {

        if(err) throw err;
        res.json(docs);
    });

});

app.post('/contactlist', function(req, res) {
    console.log("Request Post :", req.body.nome);
    connection.query('INSERT INTO tblcontact (nome, email, fone) values("'+req.body.nome+'","'+req.body.email+'", "'+req.body.fone+'")', function(err, newdocs) {

        if(err) throw err;
        console.log('Insert with success ', newdocs);
        res.json(newdocs);
    });

});

app.delete('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id)
    connection.query('DELETE FROM tblcontact WHERE id='+ id, function(err, docs) {
        if(err) throw err;
        res.json(docs)
    });
});

app.get('/contactlist/:id', function(req, res) {

    var id = req.params.id;
    connection.query('SELECT * FROM tblcontact WHERE id='+id, function(err, docs) {
        console.log(id, docs)
        res.json(docs);
    });
});

app.put('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    connection.query('UPDATE tblcontact SET nome="'+req.body.nome+'", email="'+req.body.email+'",fone="'+req.body.fone+'" WHERE id='+id, function(err, docs) {
        res.json(docs)
    });
});


 var ID    = process.env.OPENSHIFT_NODEJS_IP  || '127.0.0.1';
 var Port  = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(Port, ID);
console.log("Funcionando na porta 3000")