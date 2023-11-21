import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { Role } from '../models/Role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = `${environment.UrlPrincipal}/api/Role`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}`);
  }

  post(role: Role){
    return this.http.post(`${this.baseUrl}/CreateRole`, role);
  }

  put(role: Role){
    return this.http.put(`${this.baseUrl}/UpdateUserRole`, role);
  }

}
