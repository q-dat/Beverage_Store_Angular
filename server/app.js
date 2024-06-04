// Cài đặt các module cần thiết
const express = require('express');
const mysql = require('mysql');

// Tạo một ứng dụng Express
const app = express();

// Cấu hình kết nối cơ sở dữ liệu
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'beverage-store-angular'
});

// Kết nối với cơ sở dữ liệu
connection.connect((err) => {
  if (err) throw err;
  console.log('--------------------------------------------------------------------Kết Nối CSDL Thành Công!');
});

// Định nghĩa một API endpoint
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
// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`--------------------------------------------------------------------http://localhost:${port}/products`);
});