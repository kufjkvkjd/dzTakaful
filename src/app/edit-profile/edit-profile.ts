import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.html',
  imports: [FormsModule, CommonModule]
})
export class EditProfile {
  formVisible: boolean = false;

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

  national_card_image_url: string = '';
  medical_report_url: string = '';
  commercial_register_copy_url: string = '';
  activity_proof_documents_url: string = '';

  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';
  showAlert: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    switch (field) {
      case 'national_card_image':
        this.national_card_image = file;
        break;
      case 'medical_report':
        this.medical_report = file;
        break;
      case 'commercial_register_copy':
        this.commercial_register_copy = file;
        break;
      case 'activity_proof_documents':
        this.activity_proof_documents = file;
        break;
    }
  }

  onRoleChange(event: any) {
    this.role = event.target.value;
  }

  loadProfile() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:8000/api/showProfile', { headers }).subscribe((data: any) => {
      const baseUrl = 'http://localhost:8000/storage/';

      this.role = data.role || '';
      this.address = data.address || '';
      this.phone = data.phone || '';
      this.national_id_number = data.national_id_number || '';
      this.rib = data.rib || '';
      this.establishment_name = data.establishment_name || '';
      this.nrc = data.nrc || '';

      this.national_card_image_url = data.national_card_image ? baseUrl + data.national_card_image : '';
      this.medical_report_url = data.medical_report ? baseUrl + data.medical_report : '';
      this.commercial_register_copy_url = data.commercial_register_copy ? baseUrl + data.commercial_register_copy : '';
      this.activity_proof_documents_url = data.activity_proof_documents ? baseUrl + data.activity_proof_documents : '';

      this.formVisible = true; 
    });
  }

  downloadFile(url: string) {
    if (url) window.open(url, '_blank');
  }

  submit() {
    const formData = new FormData();

    formData.append('role', this.role);
    formData.append('address', this.address || '');
    formData.append('phone', this.phone || '');

    if (['individual', 'professional'].includes(this.role)) {
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

    if (['professional', 'entreprise'].includes(this.role)) {
      formData.append('establishment_name', this.establishment_name || '');
      formData.append('nrc', this.nrc || '');
      if (this.commercial_register_copy) {
        formData.append('commercial_register_copy', this.commercial_register_copy);
      }
    }

    if (this.role === 'entreprise' && this.activity_proof_documents) {
      formData.append('activity_proof_documents', this.activity_proof_documents);
    }

    formData.append('_method', 'PUT');

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:8000/api/updateProfile', formData, { headers }).subscribe({
      next: (res) => {
        this.alertMessage = '✅ تم تحديث البروفايل بنجاح';
        this.alertType = 'success';
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
          this.router.navigate(['/home']);
        }, 3000);
      },
      error: (err) => {
        this.alertMessage = '❌ فشل في تحديث البروفايل';
        this.alertType = 'danger';
        this.showAlert = true;

        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      }
    });
  }
}
