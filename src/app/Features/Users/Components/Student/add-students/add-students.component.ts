import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment.development';
import { Department } from '../../../../../Core/Models/department';
import { AcademicLevel } from '../../../../../Core/Models/academic-level';
import { NotifecationsService } from '../../../../../Shared/Services/notifecations-service.service';
import { PrimengModulesModule } from '../../../../../Shared/Modules/primeng-modules/primeng-modules.module';
import { HttpClient } from '@angular/common/http';
import { FileUploadEvent } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-add-students',
  standalone: true,
  imports: [PrimengModulesModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './add-students.component.html',
  styleUrl: './add-students.component.scss',
  // providers: [MessageService],
})
export class AddStudentsComponent implements OnInit {
    visibility: { [key: string]: boolean } = {};
  availableAcademicLevels: AcademicLevel[] = [];
  availableDepartments: Department[] = [];

  // 🎯 المتغيرات الجديدة لتخزين الكائن (Object) المختار
  // سنربط هذه المتغيرات بـ p-dropdown
  selectedAcademicLevel: AcademicLevel | null = null;
  selectedDepartment: Department | null = null;
  defaultPassword: string = 'MyG2026'; // قيمة افتراضية
  academicYearId: number | null = null; // سيتم ربطها بـ InputNumber
  departmentId: number | null = null; // سيتم ربطها بـ InputNumber
  isSubmitDisabled = true;
  environment: string = '';
  constructor(
    private notificationsService: NotifecationsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.environment = `${environment.apiUrl}/Import/students/import`;
    this.fetchAcademicLevels();
    this.fetchDepartments();
  }

  // 🎯 دالة جلب السنين الدراسية
  fetchAcademicLevels() {
    this.http
      .get<AcademicLevel[]>(`${environment.apiUrl}/AcademicLevel/getAll`)
      .subscribe({
        next: (data) => {
          this.availableAcademicLevels = data;
        },
        error: (err) => {
          this.notificationsService.showError(
            'خطأ',
            'فشل في جلب السنين الدراسية'
          );
          console.error('Error fetching academic levels:', err);
        },
      });
  }

  // 🎯 دالة جلب الأقسام
  fetchDepartments() {
    this.http.get<Department[]>(`${environment.apiUrl}/Department`).subscribe({
      next: (data) => {
        this.availableDepartments = data;
      },
      error: (err) => {
        this.notificationsService.showError('خطأ', 'فشل في جلب الأقسام');
        console.error('Error fetching departments:', err);
      },
    });
  }
    togglePassword(key: string) {
    const input = document.getElementById(key) as HTMLInputElement;
    if (!input) return;
    this.visibility[key] = !this.visibility[key];
    input.type = this.visibility[key] ? 'text' : 'password';
    if (this.visibility[key]) {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  customUploadHandler(event: any) {
    const files: File[] = event.files;
    if (!files || files.length === 0) return;

    const fd = new FormData();
    fd.append('File', files[0]); // اسم الحقل يجب يطابق DTO
    fd.append('DefaultPassword', this.defaultPassword || '');
    if (this.selectedAcademicLevel)
      fd.append('AcademicYearId', String(this.selectedAcademicLevel.id));
    if (this.selectedDepartment)
      fd.append('DepartmentId', String(this.selectedDepartment.id));

    this.http
      .post(`${environment.apiUrl}/Import/students/import`, fd, {
        responseType: 'text',
      })
      .subscribe({
        next: (res: string) => {
          this.notificationsService.showSuccess('نجاح', res);
          event.options.clear?.(); // إن وُجدَت
        },
        error: (err) => {
          console.error('Upload error', err);
          // err.status و err.error (string) متاحان
          this.notificationsService.showError('خطأ', err?.error || 'فشل الرفع');
        },
      });
  }

  onUpload(event: FileUploadEvent) {
    this.notificationsService.showSuccess(
      'نجاح',
      'تم رفع الملف بنجاح مع ' + event.files.length + ' ملفات'
    );
    this.isSubmitDisabled = false;
  }

  onError(event: any) {
    let errorMessage = 'حدث خطأ غير معروف أثناء رفع الملف.';
    if (event && event.xhr) {
      if (event.xhr.status === 400) {
        try {
          const response = JSON.parse(event.xhr.response);
          errorMessage =
            response.Message ||
            response.message ||
            response.errors ||
            event.xhr.response;
          if (
            typeof errorMessage === 'object' &&
            !Array.isArray(errorMessage)
          ) {
            errorMessage = Object.values(errorMessage).flat().join(' | ');
          }
        } catch (e) {
          errorMessage = event.xhr.response || errorMessage;
        }
      }
      this.notificationsService.showError(
        `فشل (Status: ${event.xhr.status})`,
        errorMessage
      );
    }

    console.error('Upload Error Details:', event.error.error.errors);
    console.error('API Response:', errorMessage);
  }
}
