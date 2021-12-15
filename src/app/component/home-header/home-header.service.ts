import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class homeService {
  constructor(public http: HttpClient) {}

  lotNumberValidation(lotNumber: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}` + '/lotvalidate/' + lotNumber);
    //return name;
  }
}
