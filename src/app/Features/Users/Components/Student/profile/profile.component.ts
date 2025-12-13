import { Component, OnInit } from '@angular/core';
import { NotifecationsService } from '../../../../../Shared/Services/notifecations-service.service';
import { APIStudentService } from '../../../Services/apistudent.service';
import { IStudent } from '../../../../../Core/Models/istudent';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  student: IStudent | null = null;
  constructor(
    private studentService: APIStudentService,
    private notificationService: NotifecationsService
  ) {}
  ngOnInit(): void {
    const nationalId = localStorage.getItem('nationalId');
    localStorage.setItem('studentId', '');
    localStorage.setItem('academicLevelId', '');
    localStorage.setItem('departmentId', '');
    if (nationalId) {
      this.studentService.getStudentDetails(nationalId).subscribe({
        next: (data) => {
          this.student = data;
          localStorage.setItem('studentId', data.id.toString());
          localStorage.setItem('academicLevel', data.academicLevel);
          localStorage.setItem('department', data.department);
        },
        error: (err) => {
          this.notificationService.showError('خطأ', 'خطأ في جلب بيانات الطالب');
        },
      });
    }
  }
}
