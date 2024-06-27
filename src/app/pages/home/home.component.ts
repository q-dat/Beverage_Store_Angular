import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Products } from '../../types/product';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  // private apiUrl = '/api';
  product = inject(HttpClient);
  data: Products[] = [];
  sale: Products[] = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.fetchData();
    this.fetchSale();
  }
  fetchData() {
    this.product
      .get<Products[]>('http://localhost:3000/products')
      .subscribe((data: Products[]) => {
        this.data = data.splice(0, 8);
        console.log(data);
      });
  }
  fetchSale() {
    this.product
      .get<Products[]>('http://localhost:3000/sale')
      .subscribe((sale: Products[]) => {
        this.sale = sale.splice(0, 8);
        console.log(sale);
      });
  }
  addToCart(item: Products): void {
    this.cartService.addToCart(item);
    console.log(this.cartService.getCart());
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  }

  trackById(index: number, item: Products): number {
    return item.id;
  }
}
