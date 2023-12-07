import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = `${environment.UrlPrincipal}/api/User`;
  // userId$ = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/AllUsers`);
  }

  getAllActive(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/ActiveUsers`);
  }

  // getById(id: string): Observable<User>{
  //   return this.http.get<User>(`${this.baseUrl}/${id}`);
  // }

  // updateUserId(value: any) {
  //   this.userId$.next(value);
  // }

  postRegister(user: User){
    return this.http.post(`${this.baseUrl}/Register`, user);
  }

  postLogin(user: User): Observable<string>{
    return this.http.post(`${this.baseUrl}/Login`, user, {
      responseType: 'text',
    });
  }

  // put(user: User){
  //   return this.http.put(`${this.baseUrl}/${user.id}`, user);
  // }

  delete(id: string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
