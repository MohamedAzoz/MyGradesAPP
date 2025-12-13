import { Component } from '@angular/core';
import { APIDoctorService } from '../../../Services/apidoctor.service';
import { NotifecationsService } from '../../../../../Shared/Services/notifecations-service.service';
import { IDoctor } from '../../../Models/idoctor';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  doctor!: IDoctor;
  constructor(
    private apiDoctorService: APIDoctorService,
    private notificationsService: NotifecationsService
  ) {}
  ngOnInit(): void {
    const nationalId = localStorage.getItem('nationalId');
    if (!nationalId) {
      this.notificationsService.showError('خطأ', 'معرف الدكتور غير موجود');
      return;
    }
    this.apiDoctorService.getDoctorDetails(nationalId).subscribe({
      next: (data) => {
        console.log(data);
        this.doctor = data;
      },
      error: (err) => {
        this.notificationsService.showError('خطأ', 'فشل في جلب بيانات الدكتور');
        console.error('Error fetching doctor details:', err);
      },
    });
  }
}
