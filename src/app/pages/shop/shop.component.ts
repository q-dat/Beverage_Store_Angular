import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Products } from '../../types/product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  // private apiUrl = '/api';
  product = inject(HttpClient);
  data: Products[] = [];
  searchTerm: string = '';
  constructor(
    private router: Router,
    private http: HttpClient,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.product
      .get<Products[]>('http://localhost:3000/products')
      .subscribe((data: Products[]) => {
        this.data = data.splice(0, 9);
        console.log(data);
      });
  }
  fetchProductsByCategory(categoryId: string): void {
    this.http
      .get<Products[]>(`http://localhost:3000/products/catalog/${categoryId}`)
      .subscribe((data: Products[]) => {
        this.data = data;
      });
  }
  searchProducts(): void {
    this.http
      .get<Products[]>(
        `http://localhost:3000/products/search/${this.searchTerm}`
      )
      .subscribe((data: Products[]) => {
        if (data.length === 0) {
          alert('Không tìm thấy sản phẩm');
        } else {
          this.data = data;
        }
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
