import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-create-profile',
  templateUrl: './create-profile.html',
  styleUrl: './create-profile.css',
  imports: [CommonModule, FormsModule]
})
export class CreateProfile {
  role: string = '';
  address: string = '';
  phone: string = '';
  national_id_number: string = '';
  rib: string = '';
  establishment_name: string = '';
  nrc: string = '';

  national_card_image: File | null = null;
  medical_report: File | null = null;
  commercial_register_copy: File | null = null;
  activity_proof_documents: File | null = null;

  alertMessage: string = '';
  alertType: 'success' | 'danger' | 'warning' = 'success';
  showAlert: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onCard(event: any) {
    this.national_card_image = event.target.files[0];
  }

  onMedicalReport(event: any) {
    this.medical_report = event.target.files[0];
  }

  onRegister(event: any) {
    this.commercial_register_copy = event.target.files[0];
  }

  onActivityProofDocuments(event: any) {
    this.activity_proof_documents = event.target.files[0];
  }

  onRoleChange(event: any) {
    this.role = event.target.value;
  }

  submit() {
    const formData = new FormData();

    formData.append('role', this.role);
    formData.append('address', this.address || '');
    formData.append('phone', this.phone || '');

    if (this.role === 'individual' || this.role === 'professional') {
      formData.append('national_id_number', this.national_id_number || '');
      if (this.national_card_image) {
        formData.append('national_card_image', this.national_card_image);
      }
    }

    if (this.role === 'individual') {
      formData.append('rib', this.rib || '');
      if (this.medical_report) {
        formData.append('medical_report', this.medical_report);
      }
    }

    if (this.role === 'professional' || this.role === 'entreprise') {
      formData.append('establishment_name', this.establishment_name || '');
      formData.append('nrc', this.nrc || '');
      if (this.commercial_register_copy) {
        formData.append('commercial_register_copy', this.commercial_register_copy);
      }
    }

    if (this.role === 'entreprise') {
      if (this.activity_proof_documents) {
        formData.append('activity_proof_documents', this.activity_proof_documents);
      }
    }

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:8000/api/registerProfile', formData, { headers }).subscribe({
      next: (res) => {
        this.alertMessage = '✅ تم إنشاء البروفايل بنجاح';
        this.alertType = 'success';
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
          this.router.navigate(['/home']);
        }, 3000);
      },

      error: (err) => {
        if (err.status === 409 || (err.error && err.error.message?.includes('already exists'))) {
          this.alertMessage = '⚠️ البروفايل موجود مسبقًا';
          this.alertType = 'warning';
        } else {
          this.alertMessage = '❌ فشل في إنشاء البروفايل';
          this.alertType = 'danger';
        }

        this.showAlert = true;

        // إخفاء التنبيه بعد 5 ثوانٍ
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);

        console.error(err);
      }
    });
  }
}
