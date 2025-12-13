import { Component } from '@angular/core';
import { APIExportService } from '../../Services/apiexport.service';
import { ButtonModule } from 'primeng/button';
import { NotifecationsService } from '../../../../Shared/Services/notifecations-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-students-grades',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './template-students-grades.component.html',
  styleUrl: './template-students-grades.component.scss',
})
export class TemplateStudentsGradesComponent {
  constructor(
    private apiExportService: APIExportService,
    private notifier: NotifecationsService,
    private route: ActivatedRoute
  ) {}
  click() {
    const subjectId = this.route.snapshot.paramMap.get('subjectId') || '';
    if (subjectId) {
      this.exportTemplateStudentsGrades(subjectId);
    }
  }
  exportTemplateStudentsGrades(subjectId: string) {
    const subjectIdInt = parseInt(subjectId, 10);
    this.apiExportService.exportGradesTemplate(subjectIdInt).subscribe({
      next: (res) => {
        const blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Template_Students_Grades.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.notifier.showSuccess('نجاح', 'تم تحميل القالب بنجاح');
      },
      error: (error) => {
        this.notifier.showError(
          'خطأ',
          'تعذر تحميل القالب، يرجى المحاولة مرة أخرى'
        );
      },
    });
  }
}
