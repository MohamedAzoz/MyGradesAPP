import { Component, OnInit } from '@angular/core';
import { ISubjectDto } from '../../../Core/Models/isubject-dto';
import { APIAssistantService } from '../../Users/Services/apiassistant.service';
import { NotifecationsService } from '../../../Shared/Services/notifecations-service.service';
import { APIDoctorService } from '../../Users/Services/apidoctor.service';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-subjects',
  standalone: true,
  imports: [MenubarModule, RouterLink],
  templateUrl: './my-subjects.component.html',
  styleUrl: './my-subjects.component.scss',
})
export class MySubjectsComponent implements OnInit {
  subjects: ISubjectDto[] = [];
  constructor(
    private assistantService: APIAssistantService,
    private notificationService: NotifecationsService,
    private doctorService: APIDoctorService
  ) {}
  ngOnInit() {
    const assistantId = Number(localStorage.getItem('assistantId') || '');
    const doctorId = Number(localStorage.getItem('doctorId') || '');
    if (assistantId) {
      this.loadSubjectsForAssistant(assistantId);
    } else if (doctorId) {
      this.loadSubjectsForDoctor(doctorId);
    }
  }
  private loadSubjectsForAssistant(assistantId: number) {
    this.assistantService.getAssistantSubjects(assistantId).subscribe({
      next: (subjects) => {
        this.subjects = subjects as ISubjectDto[];
      },
      error: (err) => {
        this.notificationService.showError('خطأ', 'فشل في جلب المواد.');
      },
    });
  }
  private loadSubjectsForDoctor(doctorId: number) {
    this.doctorService.getDoctorSubjects(doctorId).subscribe({
      next: (subjects) => {
        this.subjects = subjects as ISubjectDto[];
      },
      error: (err) => {
        this.notificationService.showError('خطأ', 'فشل في جلب المواد.');
      },
    });
  }
}
