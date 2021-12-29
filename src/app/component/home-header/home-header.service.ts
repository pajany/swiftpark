import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class homeService {
  constructor(public http: HttpClient) {}

  private selectedheader = new BehaviorSubject<string>('');
  castSlug = this.selectedheader.asObservable();
  lotNumberValidation(lotNumber: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}` + '/lotvalidate/' + lotNumber);
    //return name;
  }

  selectedSlug(slug) {
    debugger;
    this.selectedheader.next(slug);
  }

  getDynamicPage() {
    return this.http.get<any>(`${environment.apiUrl}` + '/managepage');
  }
}
