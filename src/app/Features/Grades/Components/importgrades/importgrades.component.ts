import { Component, OnInit } from '@angular/core';
import { FileUploadEvent } from 'primeng/fileupload';
import { PrimengModulesModule } from '../../../../Shared/Modules/primeng-modules/primeng-modules.module';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { NotifecationsService } from '../../../../Shared/Services/notifecations-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-importgrades',
  standalone: true,
  imports: [PrimengModulesModule],
  templateUrl: './importgrades.component.html',
  styleUrl: './importgrades.component.scss',
})
export class ImportgradesComponent implements OnInit{
  subjects: any[] = [];
  selectedSubject!: number;

  constructor(
    private http: HttpClient,
    private notificationService: NotifecationsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const subjectIdParam = this.route.snapshot.paramMap.get('subjectId');
    if (subjectIdParam) {
      this.selectedSubject = Number(subjectIdParam);
    } else {
      console.error('Subject ID is missing in the route parameters.');
      window.location.href = '/my-subjects'; // Redirect to a safe page
    }
  }
  customUploadHandler(event: any) {
    const files: File[] = event.files;
    if (!files || files.length === 0) return;
    const fd = new FormData();
    fd.append('File', files[0]); // اسم الحقل يجب يطابق DTO
    fd.append('SubjectId', String(this.selectedSubject));
    this.http
      .post(`${environment.apiUrl}/Import/grades/import`, fd, {
        responseType: 'text',
      })
      .subscribe({
        next: (res: string) => {
          this.notificationService.showSuccess('نجاح', res);
        },
        error: (err) => {
          console.error('Upload error', err);
          this.notificationService.showError('خطأ', err?.error || 'فشل الرفع');
        },
      });
  }

  onError(event: any) {
    let errorMessage = 'حدث خطأ غير معروف أثناء رفع الملف.';
    if (event && event.xhr) {
      const responseText = event.xhr.response;
      if (event.xhr.status === 400) {
        try {
          const errorObj = JSON.parse(responseText);
          if (errorObj && errorObj.message) {
            errorMessage = errorObj.message;
          }
        } catch (e) {
          errorMessage = responseText;
        }
      }
    }
    this.notificationService.showError('خطأ', errorMessage);
  }
  onUpload(event: any) {
    this.notificationService.showSuccess('نجاح', 'تم رفع الملف بنجاح.');
  }
}
