import { Component, OnInit } from '@angular/core';
import { FileUploadEvent } from 'primeng/fileupload';
import { PrimengModulesModule } from '../../../../../Shared/Modules/primeng-modules/primeng-modules.module';
import { environment } from '../../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { NotifecationsService } from '../../../../../Shared/Services/notifecations-service.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-add-assistants',
  standalone: true,
  imports: [PrimengModulesModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './add-assistants.component.html',
  styleUrl: './add-assistants.component.scss',
})
export class AddAssistantsComponent implements OnInit {
    visibility: { [key: string]: boolean } = {};
  defaultPassword: string = 'MyG2026';
  isSubmitDisabled = true;
  environment: string = '';
  constructor(
    private http: HttpClient,
    private notificationsService: NotifecationsService
  ) {}

  ngOnInit(): void {
    this.environment = environment.apiUrl;
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
      .post(`${environment.apiUrl}/Import/assistants/import`, fd, {
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

  onError(event: any) {
    let errorMessage = 'حدث خطأ غير معروف أثناء رفع الملف.';

    if (event && event.xhr) {
      const responseText = event.xhr.response;

      if (event.xhr.status === 400) {
        try {
          // محاولة تحليل استجابة الخادم
          const response = JSON.parse(responseText);

          // 🎯 هذا الجزء من الكود يركز على استخراج أخطاء التحقق (Model State Errors)
          if (response.errors) {
            // إذا كان الرد يحتوي على Model State Errors (مثل {DefaultPassword: ["The field is required"]})
            errorMessage = Object.values(response.errors).flat().join(' | ');
          } else {
            // إذا كان الرد يحتوي على رسالة عادية (مثل "must attach a file.")
            errorMessage = response.Message || response.message || responseText;
          }
        } catch (e) {
          // في حالة فشل التحليل (إذا كان الرد نصياً وليس JSON مهيكلاً)
          errorMessage = responseText || errorMessage;
        }
      }

      // عرض الرسالة للمستخدم
      this.notificationsService.showError(
        `فشل (Status: ${event.xhr.status})`,
        errorMessage
      );
    }

    // للمساعدة في Debugging
    console.error('Upload Error Details:', event);
    console.error('API Response Message:', errorMessage);
  }

  onUpload(event: FileUploadEvent) {
    this.notificationsService.showSuccess(
      'نجاح',
      'تم رفع الملف بنجاح مع ' + event.files.length + ' ملفات'
    );
    this.isSubmitDisabled = false;
  }

  // onError(event: any) {
  //   let errorMessage = 'حدث خطأ غير معروف أثناء رفع الملف.';
  //   if (event && event.xhr) {
  //     if (event.xhr.status === 400) {
  //       try {
  //         const response = JSON.parse(event.xhr.response);
  //         errorMessage =
  //           response.Message ||
  //           response.message ||
  //           response.errors ||
  //           event.xhr.response;
  //         if (
  //           typeof errorMessage === 'object' &&
  //           !Array.isArray(errorMessage)
  //         ) {
  //           errorMessage = Object.values(errorMessage).flat().join(' | ');
  //         }
  //       } catch (e) {
  //         errorMessage = event.xhr.response || errorMessage;
  //       }
  //     }
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: `فشل (Status: ${event.xhr.status})`,
  //       detail: errorMessage,
  //     });
  //   }

  //   console.error('Upload Error Details:', event.error.error.errors);
  //   console.error('API Response:', errorMessage);
  // }
}
