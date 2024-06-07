import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Products } from '../../common/product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../service/cart.service';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {  
  // private apiUrl = '/api';
  product = inject(HttpClient)
  data: Products[] = []
  constructor(private router: Router, private http: HttpClient, private cartService: CartService) {}
  ngOnInit(): void {
    this.fetchData();

  }
  fetchData() {
    this.product
      .get<Products[]>('http://localhost:3000/products')
      .subscribe((data: Products[]) => {
        this.data = data.splice(0, 9);
        console.log(data);
      })
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