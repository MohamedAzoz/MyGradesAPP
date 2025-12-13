import { Component, OnInit } from '@angular/core';
import { APIGradeService } from '../../Services/apigrade.service';
import { NotifecationsService } from '../../../../Shared/Services/notifecations-service.service';
import { IResult } from '../../Models/iresult';
import jsPDF from 'jspdf'; // <-- استيراد المكتبة
import html2canvas from 'html2canvas'; // <-- استيراد المكتبة

@Component({
  selector: 'app-my-grades',
  standalone: true,
  imports: [], // يمكنك إضافة CommonModule هنا إذا لزم الأمر ولكنه غالباً مضمن
  templateUrl: './my-grades.component.html',
  styleUrl: './my-grades.component.scss',
})
export class MyGradesComponent implements OnInit {
  grades!: IResult;

  constructor(
    private apiGradeService: APIGradeService,
    private notificationService: NotifecationsService
  ) {}

  ngOnInit() {
    const studentId = Number(localStorage.getItem('studentId'));
    if (!studentId || isNaN(studentId)) {
      this.notificationService.showError('خطأ', 'معرف الطالب غير صالح');
      return;
    }
    this.apiGradeService.getStudentGrades(studentId).subscribe({
      next: (data) => {
        this.grades = data;
      },
      error: (err) => {
        this.notificationService.showError('خطأ', 'خطأ في جلب الدرجات');
      },
    });
  }

  // دالة تحويل HTML إلى PDF
  exportToPDF() {
    // 1. تحديد العنصر المراد طباعته عن طريق الـ ID
    const data = document.getElementById('contentToConvert');

    if (data) {
      // إخفاء زر الطباعة مؤقتاً (اختياري) حتى لا يظهر في الصورة
      // يمكن عمل ذلك عبر CSS class إذا رغبت، لكن هنا سنطبع العنصر كما هو
      const printButton = document.getElementById('printButton') as HTMLElement;
      if (printButton) {
        printButton.classList.add('no-print');
      }
      // 2. استخدام html2canvas لتحويل العنصر إلى صورة
      html2canvas(data, { scale: 2 }).then((canvas) => {
        // scale: 2 تزيد الدقة (Resolution)

        // 3. إعداد أبعاد الصورة والـ PDF
        const imgWidth = 210; // عرض ورقة A4 بالمليمتر
        // const pageHeight = 297; // ارتفاع ورقة A4
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // تحويل الكانفاس إلى رابط صورة PNG
        const contentDataURL = canvas.toDataURL('image/png');

        // 4. إنشاء ملف PDF
        // 'p' تعني Portrait (طولي)، 'mm' مليمتر، 'a4' حجم الورقة
        const pdf = new jsPDF('p', 'mm', 'a4');

        const position = 0; // هامش من الأعلى

        // 5. إضافة الصورة داخل الـ PDF
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

        // 6. حفظ الملف وتنزيله للمستخدم
        pdf.save(`MyGrades_${this.grades?.studentName || 'Report'}.pdf`);
        // إعادة إظهار زر الطباعة بعد الانتهاء
        if (printButton) {
          printButton.classList.remove('no-print');
        }
        this.notificationService.showSuccess('نجاح', 'تم تنزيل ملف PDF بنجاح');
      });
    } else {
      this.notificationService.showError(
        'خطأ',
        'لم يتم العثور على المحتوى للطباعة'
      );
    }
  }
}
