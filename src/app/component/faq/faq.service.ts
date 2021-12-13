import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { environment } from '../../../environments/environment';
import {  Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(public http:HttpClient, ) { }

  getUserName(){
    return  this.http.get(`${environment.apiUrl}`+'/managefaq')
   //return name;
     }
  
}
