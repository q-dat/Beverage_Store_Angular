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
    this.fetchSale();

  }
  fetchData() {
    this.product
      .get('http://localhost:3000')
      .subscribe((data: any) => {
        this.data = data.splice(0,8);
        // console.log(data);
      })
  }
  fetchSale() {
    this.product
      .get('http://localhost:3000/sale')
      .subscribe((sale: any) => {
        this.sale = sale.splice(0, 8);
      });
  }
}
