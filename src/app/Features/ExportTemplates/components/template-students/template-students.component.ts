import { Component, OnInit } from '@angular/core';
import { APIExportService } from '../../Services/apiexport.service';
import { NotifecationsService } from '../../../../Shared/Services/notifecations-service.service';
import { APIDepartmentService } from '../../../../Shared/Services/apidepartment.service';
import { Department } from '../../../../Core/Models/department';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-template-students',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './template-students.component.html',
  styleUrl: './template-students.component.scss',
})
export class TemplateStudentsComponent implements OnInit {
  departments: Department[] = [];
  constructor(
    private apiExportService: APIExportService,
    private notifier: NotifecationsService,
    private departmentService: APIDepartmentService
  ) {}
  ngOnInit(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
        console.log(departments);
      },
      error: (error) => {
        this.notifier.showError('خطأ', 'تعذر جلب الاقسام');
      },
    });
  }
  // Method to download the student template
  downloadStudentTemplate(departmentId: string): void {
    const deptId = Number(departmentId);
    this.apiExportService.exportData(deptId).subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'student-template.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        this.notifier.showError('خطأ', error.error.err || 'تعذر تحميل القالب');
      },
    });
  }
}
