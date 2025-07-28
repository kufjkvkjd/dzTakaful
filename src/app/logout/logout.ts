import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-logout',
  imports: [CommonModule],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout {
  alertMessage: string = '';
  alertType: 'success' | 'danger' | 'warning' = 'success';
  showAlert: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.alertMessage = '⚠️ يرجى تسجيل الدخول أولاً';
      this.alertType = 'warning';
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 5000);

      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('http://localhost:8000/api/logout', {}, { headers }).subscribe({
      next: () => {
        localStorage.removeItem('token');

        this.alertMessage = '✅ تم تسجيل الخروج بنجاح';
        this.alertType = 'success';
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: () => {
        this.alertMessage = '❌ فشل تسجيل الخروج';
        this.alertType = 'danger';
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      }
    });
  }
}
