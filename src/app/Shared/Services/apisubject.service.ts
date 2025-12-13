import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ISubject } from '../../Core/Models/isubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APISubjectService {
  constructor(private http: HttpClient) {}
  // Method to get subjects by department ID
  getSubjectsByDepartment(departmentId: number): Observable<ISubject[]> {
    return this.http.get<ISubject[]>(
      `${environment.apiUrl}/Subject/byDepartment/${departmentId}`
    );
  }
}
