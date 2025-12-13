import { Component } from '@angular/core';
import { APIAssistantService } from '../../../Services/apiassistant.service';
import { NotifecationsService } from '../../../../../Shared/Services/notifecations-service.service';
import { IAssistant } from '../../../Models/iassistant';
import { MenubarModule } from 'primeng/menubar';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MenubarModule, NgTemplateOutlet, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  assistant: IAssistant | null = null;
  constructor(
    private assistantService: APIAssistantService,
    private notificationService: NotifecationsService
  ) {}
  ngOnInit(): void {
    const nationalId = localStorage.getItem('nationalId');
    localStorage.setItem('assistantId', '');
    localStorage.setItem('departmentId', '');
    if (nationalId) {
      this.assistantService.getAssistantDetails(nationalId).subscribe({
        next: (data) => {
          this.assistant = data;
          localStorage.setItem('assistantId', data.id.toString());
          localStorage.setItem('department', data.department);
        },
        error: (err) => {
          this.notificationService.showError(
            'خطأ',
            'خطأ في جلب بيانات المساعد'
          );
        },
      });
    }
  }
}
