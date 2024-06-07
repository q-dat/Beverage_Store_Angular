import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  check() {
    if (!this.email || !this.password) {
      alert('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    this.authService.login(this.email, this.password).subscribe(response => {
      if (response) {
        // Đăng nhập thành công
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);

      } else {
        alert('Email hoặc mật khẩu không đúng');
      }
    }, error => {
      alert('Đã xảy ra lỗi khi đăng nhập: ' + error.message);
    });
  }

  lookpass() {
    var x = <HTMLInputElement>document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
}
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule 
  ]
})
export class LoginModule { }
