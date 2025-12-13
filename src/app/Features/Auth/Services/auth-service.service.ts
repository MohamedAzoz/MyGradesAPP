import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../Models/ilogin';
import { environment } from '../../../../environments/environment';
import { IResponse } from '../Models/iresponse';
import { Observable } from 'rxjs';
import { IChangePassword } from '../Models/ichange-password';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}
  
  isAuthenticated(): boolean {
    return localStorage.getItem('token')? true : false;
  }
   isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }
  isStudent(): boolean {
    return localStorage.getItem('role') === 'Student';
  }
  isAssistant(): boolean {
    return localStorage.getItem('role') === 'ASSISTANT';
  }
  isDoctor(): boolean {
    return localStorage.getItem('role') === 'Doctor';
  }

  login(data: ILogin): Observable<IResponse> {
    return this.http.post<IResponse>(`${environment.apiUrl}/Auth/login`, data);
  }
  changePassword(data: IChangePassword): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/Auth/ChangePassword`,
      data
    );
  }
  logout() {
    return this.http.post<any>(`${environment.apiUrl}/Auth/logout`, {});
  }
}
