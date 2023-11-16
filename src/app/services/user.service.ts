import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = `${environment.UrlPrincipal}/api/User`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  post(user: User){
    return this.http.post(`${this.baseUrl}`, user);
  }

  put(user: User){
    return this.http.put(`${this.baseUrl}/${user.id}`, user);
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
