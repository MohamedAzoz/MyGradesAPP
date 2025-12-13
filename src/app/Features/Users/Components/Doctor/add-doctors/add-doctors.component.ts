import { Component } from '@angular/core';

import { environment } from '../../../../../../environments/environment.development';

import { PrimengModulesModule } from '../../../../../Shared/Modules/primeng-modules/primeng-modules.module';

import { HttpClient } from '@angular/common/http';
import { NotifecationsService } from '../../../../../Shared/Services/notifecations-service.service';
import { FileUploadEvent } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
@Component({
  selector: 'app-add-doctors',
  standalone: true,
  imports: [PrimengModulesModule, InputGroupAddonModule, InputGroupModule],
  templateUrl: './add-doctors.component.html',
  styleUrl: './add-doctors.component.scss',
})
export class AddDoctorsComponent {
  visibility: { [key: string]: boolean } = {};
  defaultPassword: string = 'MyG2026';
  isSubmitDisabled = true;
  environment: string = '';
  constructor(
    private notificationsService: NotifecationsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    //  this.environment = `${environment.apiUrl}/Import/students/import`;
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

    this.http
      .post(`${environment.apiUrl}/Import/doctors/import`, fd, {
        responseType: 'text',
      })
      .subscribe({
        next: (res: string) => {
          this.notificationsService.showSuccess('نجاح', res);
          event.options.clear(); // إن وُجدَت
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

    console.error('Upload Error Details:', event);
    console.error('API Response:', errorMessage);
  }
}
