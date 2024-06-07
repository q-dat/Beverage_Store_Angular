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
// User
app.post('/register', async (req, res) => {
  const { username, email, address, password } = req.body;
  if (!username || !email || !address || !password) {
      // return res.status(400).send({ message: 'Tất cả các trường đều là bắt buộc' });
  }

  try {
      const pool = await connectdb();
      const connection = await pool.getConnection();
      const query = 'INSERT INTO user (username, email, address, password) VALUES (?, ?, ?, ?)';
      await connection.query(query, [username, email, address, password]);
      connection.release();
      res.status(201).send({ message: 'Người dùng đã được đăng ký' });
  } catch (error) {
      console.error('Lỗi truy vấn: ', error);
      res.status(500).send({ error: 'Lỗi truy vấn' });
  }
});
// Lấy danh sách sản phẩm theo danh mục
app.get('/products/catalog/:id_catalog', (req, res) => {
  const id_catalog = req.params.id_catalog;
  connection.query('SELECT * FROM products WHERE id_catalog = ?', [id_catalog], (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});
app.get('/products/search/:name', (req, res) => {
  const productName = req.params.name;
  connection.query('SELECT * FROM products WHERE name LIKE ?', [`%${productName}%`], (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`--------------------------------------------------------------------http://localhost:${port}/products`);
});
