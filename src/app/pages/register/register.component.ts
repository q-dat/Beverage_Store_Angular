import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Thêm RouterModule và Router vào imports và imports
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  address: string = '';
  username: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Thêm Router vào constructor

  onSubmit(): void {
    if (!this.email || !this.password || !this.address || !this.username) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }
    this.authService.register(this.email, this.password, this.address, this.username).subscribe(
      success => {
        if (success) {
          this.successMessage = 'Đăng ký thành công!';
          this.errorMessage = '';
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Đăng ký thất bại, vui lòng thử lại!';
          this.successMessage = '';
        }
      },
      error => {
        console.error('An error occurred:', error);
        this.errorMessage = 'Đăng ký thất bại, vui lòng thử lại!';
        this.successMessage = '';
      }
    );
  }
}

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class RegisterModule { }
