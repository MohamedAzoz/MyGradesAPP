import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResult } from '../Models/iresult';
import { environment } from '../../../../environments/environment.development';
import { IGradeModel } from '../Models/igrade-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIGradeService {
  constructor(private http: HttpClient) {}
  // /api/Student/GetStudentGradesAsync/{studentId}
  getStudentGrades(studentId: number) {
    return this.http.get<IResult>(
      `${environment.apiUrl}/Student/GetStudentGradesAsync/${studentId}`
    );
  }
  // /api/Grade/{subjectId}  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  getGradesBySubject(subjectId: number): Observable<IGradeModel[]> {
    return this.http.get<IGradeModel[]>(
      `${environment.apiUrl}/Grade/${subjectId}`
    );
  }
}
