import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(public http: HttpClient) {}

  submitForm(payLoad: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}` + '/permit', payLoad);
  }
  createPayment(payLoad: any): Observable<any> {
    return this.http.post<any>(`http://localhost:6004/create-checkout-session`, payLoad);
  }
}
