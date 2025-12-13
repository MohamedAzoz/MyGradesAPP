import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IStudent } from '../../../Core/Models/istudent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIStudentService {
  constructor(private _http: HttpClient) {}

  getStudentDetails(nationalId: string): Observable<IStudent> {
    const nationalIdInt = Number(nationalId);
    return this._http.get<IStudent>(
      `${environment.apiUrl}/Student/byNationalId/${nationalIdInt}`
    );
  }

  AddStudentDetails(studentData: any) {
    return this._http.post(`${environment.apiUrl}/studentDetails`, studentData);
  }

  UploadFile(fileData: File) {
    return this._http.post(
      `${environment.apiUrl}/Import/students/import`,
      fileData
    );
  }
}
