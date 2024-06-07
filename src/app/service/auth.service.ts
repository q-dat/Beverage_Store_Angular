import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly localStorageKey = 'currentUser';

  constructor() {}

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('localStorage is not available.');
      return false;
    }
  }

  login(email: string, password: string): Observable<any> {
    if (this.isLocalStorageAvailable()) {
      const user = JSON.parse(localStorage.getItem(this.localStorageKey)!);
      if (user && user.email === email && user.password === password) {
        const token = 'your-token'; // Replace with actual token logic
        localStorage.setItem('isLoggedIn', 'true');
        return of({ token });
      }
    }
    return of(false);
  }

  register(email: string, password: string, address: string, nameuser: string): Observable<any> {
    if (this.isLocalStorageAvailable()) {
      const user = { email, password, address, nameuser };
      localStorage.setItem(this.localStorageKey, JSON.stringify(user));
      return of(true);
    }
    return of(false);
  }
  
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('isLoggedIn', 'false');
    }
  }

  getUserEmail(): string | null {
    if (this.isLocalStorageAvailable()) {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem(this.localStorageKey)!);
        return user ? user.email : null;
      }
    }
    return null;
  }

  getUserName(): string | null {
    if (this.isLocalStorageAvailable()) {
      const user = JSON.parse(localStorage.getItem(this.localStorageKey)!);
      return user ? user.nameuser : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }
}
export class TempStorageService {
  private storage: { [key: string]: string } = {};

  setItem(key: string, value: string): void {
    this.storage[key] = value;
  }

  getItem(key: string): string | null {
    return this.storage[key] || null;
  }

  removeItem(key: string): void {
    delete this.storage[key];
  }
}