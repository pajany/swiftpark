import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsersTable } from 'src/app/_fake/fake-db/users.table'; 
import { environment } from 'src/environments/environment';
import { AuthModel } from '../../_models/auth.model';
import { UserModel } from '../../_models/user.model';

const API_USERS_URL = `${environment.apiUrl}/signin`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }
getuserdata:any[ ]=[];

// login(email: string, password: string): Observable<any> {
//      return this.http.post<AuthModel>(`${API_USERS_URL}`, { email, password });
//    }

   // public methods
  login(email: string, password: string): Observable<any> {
    const notFoundError = new Error('Not Found');
    if (!email || !password) {
      return of(notFoundError);
    }

    return this.getLoginUsers(email,password).pipe(
      map((result: UserModel[]) => {
        if (result.length <= 0) {
          return notFoundError;
        }

         
        const user = result.find((u) => {
          return (
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
          );
        });
        if (!user) {
          return notFoundError;
        }
        console.log("user data",user);

        this.getuserdata.push(user);
         const auth = new AuthModel();
        auth.authToken = user.authToken;
        auth.refreshToken = user.refreshToken;
        auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
        return auth;
      })
    );
  }

  createUser(user: UserModel): Observable<any> {
    user.roles = [2]; // Manager
    user.authToken = 'auth-token-' + Math.random();
    user.refreshToken = 'auth-token-' + Math.random();
    user.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
 
    return this.http.post<UserModel>(API_USERS_URL, user);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((result: UserModel[]) => {
        const user = result.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        return user !== undefined;
      })
    );
  }

  getUserByToken(token): Observable<UserModel> {

    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
      return this.http.get<UserModel>(`${API_USERS_URL}`, {
        headers: httpHeaders,
      });
  }

  // getUserByToken(token): Observable<UserModel> {

  //   console.log("-------getUserByToken--------",this.getuserdata);
  //   if(this.getuserdata){ 
  //      const user = this.getuserdata.find((u) => {
  //         return u.authToken === token;
  //       });
    
  //       if (!user) {
  //         return of(undefined);
  //       }
    
  //       return of(user);
        
  //     }else{
  //       return of(undefined);
  //     }
       
  // } 


  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(API_USERS_URL);
  }

  getLoginUsers(email: string, password: string): Observable<any> {
    return this.http.post<AuthModel>(`${API_USERS_URL}`, { email, password });
  }

  // public methods
  // login(email: string, password: string): Observable<any> {
  //   return this.http.post<AuthModel>(`${API_USERS_URL}`, { email, password });
  // }

  // // CREATE =>  POST: add a new user to the server
  // createUser(user: UserModel): Observable<UserModel> {
  //   return this.http.post<UserModel>(API_USERS_URL, user);
  // }

  // // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  // forgotPassword(email: string): Observable<boolean> {
  //   return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
  //     email,
  //   });
  // }

  // getUserByToken(token): Observable<UserModel> {
  //   const httpHeaders = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.get<UserModel>(`${API_USERS_URL}/me`, {
  //     headers: httpHeaders,
  //   });
  // }
}
