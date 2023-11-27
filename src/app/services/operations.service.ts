import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { InvestmentPlan } from '../models/InvestmentPlan';
import { LoanPlan } from '../models/LoanPlan';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  baseUrl = `${environment.UrlPrincipal}/api`;

  constructor(private http: HttpClient) { }

// Operations Investment Plan

  postInvestmentPlan(Iplan: InvestmentPlan) {
    return this.http.post(`${this.baseUrl}/OperationsInvestmentPlan`, Iplan);
  }

  deleteInvestmentPlan(id: number){
    return this.http.delete(`${this.baseUrl}/OperationsInvestmentPlan/${id}`);
  }

// Operations Loan Plan   
  postLoanPlan(Lplan: LoanPlan) {
    return this.http.post(`${this.baseUrl}/OperationsLoanPlan`, Lplan);
  }

  deleteLoanPlan(id: number){
    return this.http.delete(`${this.baseUrl}/OperationsLoanPlan/${id}`);
  }


}
