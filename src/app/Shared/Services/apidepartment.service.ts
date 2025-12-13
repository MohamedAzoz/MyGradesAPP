import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Department } from '../../Core/Models/department';

@Injectable({
  providedIn: 'root',
})
export class APIDepartmentService {
  constructor(private http: HttpClient) {}
  ///api/Department
  getAllDepartments() {
    return this.http.get<Department[]>(`${environment.apiUrl}/Department`);
  }
}
