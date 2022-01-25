import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewTransactionService {
  constructor(public http: HttpClient) {}

  transactionSubmit(payLoad: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}` + '/viewtransaction', payLoad);
  }

}
