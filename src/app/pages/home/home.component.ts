import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import{Products} from '../../common/product'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  product = inject(HttpClient);
  data: Products[] = [];
  sale: Products[] = [];
  ngOnInit(): void {
    this.fetchData();
    this.fetchSale();
  }
  fetchData() {
    this.product.get<Products[]>('http://localhost:3000').subscribe((data: Products[]) => {
      this.data = data.splice(0, 8);
      // console.log(data);
    });
  }
  fetchSale() {
    this.product.get<Products[]>('http://localhost:3000/sale').subscribe((sale: Products[]) => {
      this.sale = sale.splice(0, 8);
    });
  }
}
