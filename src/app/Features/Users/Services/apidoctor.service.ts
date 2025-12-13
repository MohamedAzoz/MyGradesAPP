import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IDoctor } from '../Models/idoctor';
import { Observable } from 'rxjs';
import { ISubjectDto } from '../../../Core/Models/isubject-dto';

@Injectable({
  providedIn: 'root',
})
export class APIDoctorService {
  constructor(private _http: HttpClient) {}
  // getDoctorDetails(id: number) {
  //   return this._http.get(`${environment.apiUrl}/doctorDetails/${id}`);
  // }
  // /api/Doctor/ByNationalId/{nationalId}
  getDoctorDetails(nationalId: string): Observable<IDoctor> {
    const nationalIdInt = Number(nationalId);
    return this._http.get<IDoctor>(
      `${environment.apiUrl}/Doctor/ByNationalId/${nationalIdInt}`
    );
  }
  // /api/Doctor/{id}/subjects
  getDoctorSubjects(doctorId: number) {
    return this._http.get<ISubjectDto[]>(
      `${environment.apiUrl}/Doctor/${doctorId}/subjects`
    );
  }

  UploadFile(fileData: File) {
    return this._http.post(`${environment.apiUrl}/fileUpload`, fileData);
  }
}
