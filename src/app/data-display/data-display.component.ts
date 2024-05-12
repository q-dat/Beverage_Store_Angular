import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule,],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent implements OnInit {
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