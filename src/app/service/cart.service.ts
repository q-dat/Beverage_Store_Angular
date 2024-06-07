import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private cart = new BehaviorSubject<any[]>(this.getCartFromLocalStorage());
  // cart$ = this.cart.asObservable();
  // private cartKey = 'cart';
  // private localStorageAvailable = this.isLocalStorageAvailable();

  // constructor() {}

  // private getCartFromLocalStorage(): any[] {
  //   if (this.localStorageAvailable) {
  //     const cartString = localStorage.getItem(this.cartKey);
  //     return cartString ? JSON.parse(cartString) : [];
  //   } else {
  //     console.error('localStorage is not available.');
  //     return [];
  //   }
  // }

  // private isLocalStorageAvailable(): boolean {
  //   try {
  //     localStorage.setItem('test', 'test');
  //     localStorage.removeItem('test');
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }
  
  private updateCart(cart: any[]): void {
    this.cart.next(cart);
  }
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();
  private cartKey = 'cart';
  private localStorageAvailable = false;

  constructor() {
    this.localStorageAvailable = this.isLocalStorageAvailable();
    if (this.localStorageAvailable) {
      this.cart.next(this.getCartFromLocalStorage());
    } else {
      console.error('localStorage is not available.');
    }
  }

  private getCartFromLocalStorage(): any[] {
    const cartString = localStorage.getItem(this.cartKey);
    return cartString ? JSON.parse(cartString) : [];
  }

  private isLocalStorageAvailable(): boolean {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  private saveCart(cart: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  getCart(): any[] {
    if (this.localStorageAvailable) {
      return this.getCartFromLocalStorage();
    } else {
      console.error('localStorage is not available.');
      return [];
    }
  }

  addToCart(newItem: any): void {
    let cart = this.getCart();
    const existingItemIndex = cart.findIndex(item => item.id === newItem.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].count += 1;
    } else {
      newItem.count = 1;
      cart.push(newItem);
    }

    this.saveCart(cart);
    this.updateCart(cart);
  }

  updateCount(index: number, value: number): void {
    let cart = this.getCart();
    cart[index].count = value;
    this.saveCart(cart);
    this.updateCart(cart);
  }

  removeFromCart(index: number): void {
    let cart = this.getCart();
    cart.splice(index, 1);
    this.saveCart(cart);
    this.updateCart(cart);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.updateCart([]);
  }
}
