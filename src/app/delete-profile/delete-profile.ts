import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.html',
  imports: [FormsModule, CommonModule]
})
export class DeleteProfile implements OnInit {
  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';
  showAlert: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  deleteProfile() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    if (confirm("هل أنت متأكد أنك تريد حذف البروفايل؟ لا يمكن التراجع بعد الحذف.")) {
      this.http.delete('http://localhost:8000/api/deleteProfile', { headers }).subscribe({
        next: () => {
          this.alertMessage = '✅ تم حذف البروفايل بنجاح.';
          this.alertType = 'success';
          this.showAlert = true;

          setTimeout(() => {
            this.showAlert = false;
            this.router.navigate(['/home']);
          }, 3000);
        },
        error: (error) => {
          console.error("خطأ أثناء حذف البروفايل:", error);

          if (error.status === 404) {
            this.alertMessage = '❌ لا يوجد بروفايل لحذفه.';
          } else {
            this.alertMessage = '❌ فشل في حذف البروفايل أو لم يتم تسجيل الدخول بعد.';
          }

          this.alertType = 'danger';
          this.showAlert = true;

          setTimeout(() => {
            this.showAlert = false;
          }, 5000);
        }
      });
    }
  }
}
