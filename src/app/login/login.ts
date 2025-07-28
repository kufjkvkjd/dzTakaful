import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  alertMessage: string = '';
  alertType: 'success' | 'danger' | 'warning' = 'success';
  showAlert: boolean = false;


  constructor(private http: HttpClient, private router: Router) {}

login() {
  const data = {
    email: this.email,
    password: this.password,
  };

  this.http.post<any>('http://localhost:8000/api/login', data).subscribe({
    next: (res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);

        this.alertMessage = '✅ تم تسجيل الدخول بنجاح';
        this.alertType = 'success';
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
          this.router.navigate(['/home']);
        }, 3000);
      } else {
        this.alertMessage = '❌ لم يتم استلام التوكن من الخادم';
        this.alertType = 'danger';
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      }
    },
    error: (err) => {
      this.alertMessage = '❌ فشل تسجيل الدخول، تحقق من البيانات';
      this.alertType = 'danger';
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 5000);

      console.error(err);
    }
  });
}
}
