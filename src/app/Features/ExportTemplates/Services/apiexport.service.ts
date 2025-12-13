import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class APIExportService {
  constructor(private http: HttpClient) {}
  // /api/Export/export-template-students
  exportData(departmentId: number) {
    return this.http.get(
      `${environment.apiUrl}/Export/export-template-students`,
      { params: { departmentId }, responseType: 'blob' }
    );
  }
  // /api/Export/export-students-grades
  exportGrades(subjectId: number) {
    return this.http.get(
      `${environment.apiUrl}/Export/export-students-grades`,
      { params: { subjectId }, responseType: 'blob' }
    );
  }
  // /api/Export/export-grades-template
  exportGradesTemplate(subjectId: number) {
    return this.http.get(
      `${environment.apiUrl}/Export/export-grades-template`,
      { params: { subjectId }, responseType: 'blob' }
    );
  }
}
