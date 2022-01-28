import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AplicationFormService {
  constructor(public http: HttpClient) {}

  getProvince(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}` + '/statelist');
  }

  getTimeZone(): Observable<any> {
    return this.http.get<any>('https://worldtimeapi.org/api/timezone/America');
  }

  submitForm(payLoad: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}` + '/contactform', payLoad);
  }
}
