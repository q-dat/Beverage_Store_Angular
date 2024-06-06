const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import middleware cors

const app = express();

app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'beverage-store-angular'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Kết Nối CSDL Thành Công!');
});

app.get('/products', (req, res) => {
  connection.query('SELECT * FROM products ', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  connection.query('SELECT * FROM products WHERE id = ?', [productId], (error, results, fields) => {
    if (error) throw error;
    if (results.length === 0) {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    } else {
      res.json(results[0]);
    }
  });
});

app.get('/sale', (req, res) => {
  connection.query('SELECT * FROM products WHERE sale ', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server đang lắng nghe trên http://localhost:${port}`);
});
