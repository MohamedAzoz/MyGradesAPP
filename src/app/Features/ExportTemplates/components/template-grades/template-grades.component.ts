import { Component } from '@angular/core';
import { APIExportService } from '../../Services/apiexport.service';
import { ButtonModule } from 'primeng/button';
import { NotifecationsService } from '../../../../Shared/Services/notifecations-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-grades',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './template-grades.component.html',
  styleUrl: './template-grades.component.scss',
})
export class TemplateGradesComponent {
  constructor(
    private apiExportService: APIExportService,
    private notifier: NotifecationsService,
    private route: ActivatedRoute
  ) {}
  // Method to download the grades template
  click() {
    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    if (subjectId) {
      this.downloadGradesTemplate(subjectId);
    }
  }
  downloadGradesTemplate(subjectId: string): void {
    const subjId = Number(subjectId);
    this.apiExportService.exportGrades(subjId).subscribe({
      next: (response: Blob) => {
        this.notifier.showSuccess('نجاح', 'تم تحميل القالب بنجاح');
        setTimeout(() => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'grades-template.xlsx';
          a.click();
          window.URL.revokeObjectURL(url);
        }),
          700;
      },
      error: (error) => {
        this.notifier.showError('خطأ', error.error.err || 'تعذر تحميل القالب');
      },
    });
  }
}
