const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Create a MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'inventorymanagement'
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
});

//insert inventory
router.post('/', (req, res, next) => {
    const product_id = req.body.product_id;
    const product_name = req.body.product_name;
    const category = req.body.category;
    const quantity = req.body.quantity;
    const unit_price = req.body.unit_price;
    const supplier_id = req.body.supplier_id;
    const purchase_date = req.body.purchase_date;
    const expiration_date = req.body.expiration_date;
    const location = req.body.location;

    const query = `
        INSERT INTO inventory (product_id, product_name, category, quantity, unit_price, supplier_id, purchase_date, expiration_date, location)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    connection.query(query,[product_id, product_name, category, quantity, unit_price, supplier_id, purchase_date, expiration_date, location], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        } else {
            console.log("inserted product");
            res.status(200).json(results);
        }
    });
})

//get all inventory
router.get('/', (req, res, next) => {
    const query = 'SELECT * FROM inventory';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      } else {
        if (results[0]==null){
            console.log("no any product available");
            res.status(404).json({
                "message" : "no any product available"
            })
        } else {
            res.status(200).json(results);
        }
      }
    });
})

//get inventory by productId
router.get('/:productId', (req, res, next) => {
    const product_id = req.params.productId;
    const query = 'SELECT * FROM inventory WHERE product_id=?';
    connection.query(query,[product_id], (err, results) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      } else {
        if (results[0]==null){
            console.log("Product not available");
            res.status(404).json({
                "message" : "Product not available"
            })
        } else {
            res.status(200).json(results);
        }
      }
    });
})

//check productId valid
router.get('/check/:productId', (req, res, next) => {
    const product_id = req.params.productId;
    const query = 'SELECT * FROM inventory WHERE product_id=?';
    connection.query(query,[product_id], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        } else {
            if (results[0]==null){
                console.log(`product_id - ${product_id} : not available`);
                res.status(200).json({
                    "isAvailable" : "0",
                    "remainQuantity" : "0"
                });
            } else {
                console.log(`product_id - ${product_id} : available`);
                const remainQuan = results[0].quantity
                res.status(200).json({
                    "isAvailable" : "1",
                    "remainQuantity" : `${remainQuan}`
                });
            }
        }
    })
})

//update inventrory
router.patch('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    const newProduct_name = req.body.newProduct_name;
    const newCategory = req.body.newCategory;
    const newQuantity = req.body.newQuantity;
    const newUnit_price = req.body.newUnit_price;
    const newSupplier_id = req.body.newSupplier_id;
    const newPurchase_date = req.body.newPurchase_date;
    const newExpiration_date = req.body.newExpiration_date;
    const newLocation = req.body.newLocation;

    const query = `
        UPDATE inventory
        SET
            product_name = ?,
            category = ?,
            quantity = ?,
            unit_price = ?,
            supplier_id = ?,
            purchase_date = ?,
            expiration_date = ?,
            location = ?
        WHERE product_id = ?;
    `;

    connection.query(query, [newProduct_name, newCategory, newQuantity, newUnit_price, newSupplier_id, newPurchase_date, newExpiration_date, newLocation, productId], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.status(200).json(results);
    })
})

//update inventrory qunatity
router.patch('/quantity/:productId', (req, res, next) => {
    const productId = req.params.productId;
    const newQuantity = req.body.newQuantity;

    const query = `UPDATE inventory SET quantity = ? WHERE product_id = ?;`;

    connection.query(query, [newQuantity, productId], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.status(200).json(results);
    })
})

//inventory delete
router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId;

    const query = 'DELETE FROM inventory WHERE product_id=?';

    connection.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.status(200).json(results);
    })
});

module.exports = router;