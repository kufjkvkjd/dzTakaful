import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-profiles',
  imports: [CommonModule],
  templateUrl: './profiles.html',
  styleUrls: ['./profiles.css']
})
export class Profiles {
  profiles: any[] = [];

  constructor(private http: HttpClient) {}

  loadProfiles() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:8000/api/profiles', { headers }).subscribe({
      next: (data: any) => {
        this.profiles = data;
      },
      error: (error) => {
        console.error('فشل تحميل البروفايلات:', error);
      }
    });
  }
}
