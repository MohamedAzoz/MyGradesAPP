import { Component, OnInit } from '@angular/core';
import { IGradeModel } from '../../Models/igrade-model';
import { APIGradeService } from '../../Services/apigrade.service';
import { NotifecationsService } from '../../../../Shared/Services/notifecations-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-students-grades',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './students-grades.component.html',
  styleUrl: './students-grades.component.scss',
})
export class StudentsGradesComponent implements OnInit {
  grades!: IGradeModel[];
  subjectId!:number;
  constructor(
    private apiGradeService: APIGradeService,
    private notificationService: NotifecationsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const subjectId = Number(this.route.snapshot.paramMap.get('subjectId'));
    if (subjectId) {
      this.subjectId=subjectId;
      
      this.apiGradeService.getGradesBySubject(subjectId).subscribe({
        next: (grades) => {
          this.grades = grades;
        },
        error: (err) => {
          this.notificationService.showError(
            'خطا',
            'لا توجد بيانات درجات للطلاب بهذا المقرر'
          );
        },
      });
    }
  }
}
