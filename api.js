const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

app.use(bodyParser.json());
// Connection MySql 
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodetest'
})
connection.connect();

app.get('/', function (req, res) {
    res.send('Hello World')
})
/**
 * Affichage de tous les produits
 */
app.get('/produits', (req, res) => {
    connection.query('SELECT * from products', (err, rows, fields) => {
        if (err) throw err;
        res.json(rows)
        console.log('The solution is: ', rows)
    })
})

/**
 * Consultation d'un produit 
 */
app.get('/produit/:id', (req, res) => {
    const { id } = req.params
    connection.query('select * from products where id = ?', [id], (err, rows, fields) => {
        if (err) throw err;
        res.json(rows)
        console.log('Le produit ' + id + 'est :', rows);
    })
})

/**
 * Ajout d'un nouveau produit
 */

app.post('/produits/add', (req, res) => {
    const { libelle, prix } = req.body
    const values = {
        libelle: libelle,
        prix: prix
    }
    connection.query('insert into products set ?', values, (err, rows, fields) => {
        if (err) throw err;
        console.log("L'ajout a été effectué avec succès");
        res.json(rows)
    })
})
/**
 * Suppression d'un produit
 */
app.delete('/produits/destroy/:id', (req, res) => {
    const { id } = req.params
    connection.query('delete from products where id = ?', [id], (err, rows, fields) => {
        if (err) throw ("L'erreur est ", err);
        console.log("la suppression est effectué avec succes", rows);
        res.json(rows)
    })
})

/**
 * Modification d'un produit
 */
app.put('/produit/update/:id', (req, res) => {
    const {id} = req.params
    let { libelle, prix } = req.body
    const values = {
        libelle: libelle,
        prix: prix
    }
    connection.query('update products set ? where id = ?', [values, id], (err, rows, fields) => {
        if (err) throw ("Une erreur de modification a été trouvé ", err)
        console.log(`La modification a été un succés ', ${rows.affectedRows} affectés`);
        res.json(rows)
    })
})











app.listen(port, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})