const express = require('express'); // importa o express
const mongoose = require('mongoose')
const server = express(); // cria uma variável chamada server que chama a funçã o express

server.listen(3000); // faz com que o servidor seja executado na porta 3000 do seu localhost:3000

mongoose.connect("mongodb://localhost/apitest", {useUnifiedTopology: true})

const connection = mongoose.connection

connection.once('open', () => {
    console.log("deu certo!")
})

server.get("/", (req, res) => {
    res.send("Deu certo!")
})

var customerSchema = new mongoose.Schema({
    name: String,
    email: String
}, { collection: 'customers' }
);

/* GET all customers. */
server.get('/customers', function (req, res, next) {
    var Customer = mongoose.model('customers', customerSchema, 'customers');
    Customer.find({}).lean().exec(function(e,docs){
       res.json(docs);
       res.end();
    });
});