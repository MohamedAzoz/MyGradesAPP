import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { IAssistant } from '../Models/iassistant';
import { BehaviorSubject } from 'rxjs';
import { ISubject } from '../../../Core/Models/isubject';
import { ISubjectDto } from '../../../Core/Models/isubject-dto';

@Injectable({
  providedIn: 'root',
})
export class APIAssistantService {
  public Subjects: BehaviorSubject<ISubjectDto[]> = new BehaviorSubject<
    ISubjectDto[]
  >([]);

  constructor(private _http: HttpClient) {}
  //  /api/Assistant/byNationalId/{nationalId}
  getAssistantDetails(nationalId: string) {
    const nationalIdInt = Number(nationalId);
    return this._http.get<IAssistant>(
      `${environment.apiUrl}/Assistant/byNationalId/${nationalIdInt}`
    );
  }

  // /api/Assistant/{assistantId}/subjects
  getAssistantSubjects(assistantId: number) {
    return this._http.get<ISubjectDto[]>(
      `${environment.apiUrl}/Assistant/${assistantId}/subjects`
    );
  }

  UploadFile(fileData: File) {
    return this._http.post(`${environment.apiUrl}/fileUpload`, fileData);
  }
}
