import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  public cart: any[] = [];
  isCartEmpty: boolean = false;
  constructor(private http: HttpClient, private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.checkCart();
  }
  checkCart(): void {
    this.isCartEmpty = this.cart.length === 0;
  }
  removeItemFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.cart = this.cartService.getCart(); 
  }

  getTotalCost(): number {
    return this.cart.reduce((total, pr) => total + (pr.price * pr.count), 0);
  }

  getTotalCount(): number {
    return this.cart.reduce((total, pr) => total + pr.count, 0);
  }

  incrementCount(index: number): void {
    this.cartService.updateCount(index, this.cart[index].count + 1);
    this.cart = this.cartService.getCart();
  }

  decrementCount(index: number): void {
    if (this.cart[index].count > 1) {
      this.cartService.updateCount(index, this.cart[index].count - 1);
      this.cart = this.cartService.getCart(); 
    }
  }
}
