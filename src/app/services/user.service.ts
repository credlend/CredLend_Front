import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/enviroments/enviroment';
import { ExternalAuth } from '../interfaces/externalAuth';
import { AuthResponse } from '../interfaces/authResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = `${environment.UrlPrincipal}/api/v1/User`;

  constructor(private http: HttpClient) { }

  getInvestmentById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  postRegister(user: User){
    return this.http.post(`${this.baseUrl}/Register`, user);
  }

  postLogin(user: User): Observable<string>{
    return this.http.post(`${this.baseUrl}/Login`, user, {
      responseType: 'text',
    });
  }

  delete(id: string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  public externalLogin = (body: ExternalAuth) => {
    return this.http.post<AuthResponse>(`${this.baseUrl}/ExternalLogin`, body);
  }
}
