import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name = '';
  email = '';
  password = '';
  password_confirmation = '';

  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';
  showAlert: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
    };

    this.http.post('http://localhost:8000/api/register', data).subscribe({
      next: (res) => {
        this.alertMessage = '✅ تم التسجيل بنجاح';
        this.alertType = 'success';
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
          this.router.navigate(['/home']);
        }, 3000);

        console.log(res);
      },
      error: (err) => {
        this.alertMessage = '❌ فشل في التسجيل. يرجى التحقق من البيانات';
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
