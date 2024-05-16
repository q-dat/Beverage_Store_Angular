git add .
git commit -m "beverage-store" 
git push origin main 
--------------------------------------------------------------------
        [&>*:nth-child(odd)]:
        [&>*:nth-child(even)]:
--------------------------------------------------------------------
import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule,],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  product = inject(HttpClient)
  data: any[] = []
  sale: any[] = []
  ngOnInit(): void {
    this.fetchData();
    this.fetchData1();

  }
  fetchData() {
    this.product
      .get('http://localhost:3000/listproducts')
      .subscribe((data: any) => {
        this.data = data.splice(0, 8);
        // console.log(data);
      })
  }
  fetchData1() {
    this.product
      .get('http://localhost:3000/listproducts')
      .subscribe((sale: any) => {
        const filterSale = sale.filter((item: any) => item.sale && item.sale.price);
        this.sale = filterSale.splice(0, 8);
      });
  }
}
--------------------------------------------------------------------------------
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as mysql from 'mysql';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './App.html',
})

export class AppComponent {
  products: any[] = [];

  constructor() {
    this.fetchProductsFromDatabase();
  }

  fetchProductsFromDatabase() {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'beverage-store-angular',
    });

    connection.connect((error: any) => {
      if (error) {
        console.error('OK sai rồi! Sửa ngay đi: ', error);
        return;
      }
      console.log('Kết Nối Database Thành Công Gòi!');

      // Truy vấn cơ sở dữ liệu và ghi nhật ký kết quả
      connection.query('SELECT * FROM products', (error, results, fields) => {
        if (error) {
          console.error('Lỗi khi lấy dữ liệu: ', error);
          return;
        }

        // console.log('Dữ liệu đồ uống:', results);
        this.products = results;
        this.showProducts();
      });

      // Đóng kết nối khi xong
      connection.end();
    });
  }

  showProducts() {
    // console.log('Sản phẩm:', this.products);
    this.products.map((product) => {
      // console.log(`Tên sản phẩm: ${product.name}, Giá: ${product.price}`);
    });
  }
}

<div *ngFor="let product of products">
</div>