const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
//We declare the port
const PORT = process.env.PORT || 3050;
const app = express();
app.use(bodyParser.json());
// Connection Data
const conecction = mysql.createConnection({
    host: "data-avimo.cgriqmyweq5c.us-east-2.rds.amazonaws.com",
    user: "testing",
    password: "Pruebas%ALI%2020",
    database: "testing_ali_fullstack"
});
//All users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users_test_antonio_cruz_hernandez';
    conecction.query(sql, (error, result) => {
        if(error) throw error;
        if(result.length > 0){
            res.json(result);
        }else{
            res.send('Not result');
        }
    });
});
//Show user by id
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM users_test_antonio_cruz_hernandez WHERE id = ${id}`;
    conecction.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
        res.json(result);
        } else {
        res.send('Not result');
        }
    });
});
// Create a new user
app.post('/users/add', (req, res) => {
    const sql = 'INSERT INTO users_test_antonio_cruz_hernandez SET ?';
    const userObj = {
      name: req.body.name,
      second_name: req.body.second_name,
      last_name: req.body.last_name,
      mothers_last_name: req.body.mothers_last_name,
      birth_date: req.body.birth_date,
      email: req.body.email,
      phone: req.body.phone
    };
    conecction.query(sql, userObj, error => {
      if (error) throw error;
      res.send('User created');
    });
});
// Update a user
app.put('/users/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, second_name, last_name, mothers_last_name, birth_date, email, phone } = req.body;
    const sql = `UPDATE users_test_antonio_cruz_hernandez SET name='${name}', second_name='${second_name}', last_name='${last_name}', mothers_last_name='${mothers_last_name}', birth_date='${birth_date}', email='${email}', phone='${phone}' WHERE id =${id}`;
    conecction.query(sql, error => {
        if (error) throw error;
        res.send('User updated!');
    });
});
// Delete a user by id
app.delete('/users/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM users_test_antonio_cruz_hernandez WHERE id= ${id}`;
    conecction.query(sql, error => {
        if (error) throw error;
        res.send('Delete user');
    });
});
//Verification of the connection
conecction.connect(function(error) {
    if (error) throw error;
    console.log("Connected!");
});
//Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});