// Sử dụng CreatPool để kết nối CSDL
const mysql = require('mysql2/promise');
const fs = require('fs').promises;
async function connectdb() {
    try {
        const pool = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'beverage-store-angular',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        return pool;
    }
    catch (error) {
        console.log('--------------------------------------------------------------------Lỗi kết nối: ' + error);
        throw error;
    }
}

// Get dữ liệu với nhiều option, tạo biến kiểu Object để lưu các kết quả
async function CreateHomeJsonFile() {
    try {
        const pool = await connectdb();
        // const connection = await pool.getConnection();
        const [newRows, Rows] = await pool.query('SELECT * FROM products')
        // const [newCategory, Category] = await pool.query('SELECT * FROM category')
        const homeData = {
            Products: newRows,
            // Category:newCategory,
        };
        // Thực hiện ghi dữ liệu thành file json
        const jsonData = JSON.stringify(homeData, null, 2);
        await fs.writeFile('server/db.json', jsonData);
        console.log('--------------------------------------------------------------------Xuất file JSON thành công');
        pool.end(); //Kết thúc pool kết nối
    } catch (error) {
        console.error('--------------------------------------------------------------------Lỗi xuất file: ', error);
        throw error;
    }
}
CreateHomeJsonFile();