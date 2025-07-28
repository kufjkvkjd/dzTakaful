import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-view-profile',
  templateUrl: './view-profile.html',
  imports: [FormsModule, CommonModule, RouterModule]
})
export class ViewProfile {
  formVisible: boolean = false;

  role: string = '';
  address: string = '';
  phone: string = '';
  national_id_number: string = '';
  rib: string = '';
  establishment_name: string = '';
  nrc: string = '';

  national_card_image_url: string = '';
  medical_report_url: string = '';
  commercial_register_copy_url: string = '';
  activity_proof_documents_url: string = '';

  constructor(private http: HttpClient) {}

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
}
