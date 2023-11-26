import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { InvestmentPlan } from '../models/InvestmentPlan';
import { LoanPlan } from '../models/LoanPlan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  baseUrl = `${environment.UrlPrincipal}/api`;

  constructor(private http: HttpClient) { }

  // InvestmentPlan Methods
  getAllInvestment(): Observable<InvestmentPlan[]> {
    return this.http.get<InvestmentPlan[]>(`${this.baseUrl}/InvestmentPlan`);
  }

  postInvestment(Iplan: InvestmentPlan) {
    return this.http.post(`${this.baseUrl}/InvestmentPlan`, Iplan);
  }

  putInvestment(Iplan: InvestmentPlan) {
    return this.http.put(`${this.baseUrl}/InvestmentPlan`, Iplan);
  }

  getInvestmentById(id: string): Observable<InvestmentPlan> {
    return this.http.get<InvestmentPlan>(`${this.baseUrl}/InvestmentPlan/${id}`);
  }

  putInvestmentById(Iplan: InvestmentPlan){
    return this.http.put(`${this.baseUrl}/InvestmentPlan/${Iplan.id}`, Iplan);
  }

  // LoanPlan Methods
  getAllLoan(): Observable<LoanPlan[]> {
    return this.http.get<LoanPlan[]>(`${this.baseUrl}/LoanPlan`);
  }

  postLoan(Lplan: LoanPlan) {
    return this.http.post(`${this.baseUrl}/LoanPlan`, Lplan);
  }

  putLoan(Lplan: LoanPlan) {
    return this.http.put(`${this.baseUrl}/LoanPlan`, Lplan);
  }

  getLoanById(id: string): Observable<LoanPlan> {
    return this.http.get<LoanPlan>(`${this.baseUrl}/LoanPlan/${id}`);
  }

  putLoanById(Lplan: LoanPlan){
    return this.http.put(`${this.baseUrl}/LoanPlan/${Lplan.id}`, Lplan);
  }

}
