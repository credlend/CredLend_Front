import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvestmentOperation } from 'src/app/models/InvestmentOperation';
import { InvestmentPlan } from 'src/app/models/InvestmentPlan';
import { LoanOperation } from 'src/app/models/LoanOperation';
import { LoanPlan } from 'src/app/models/LoanPlan';
import { OperationService } from 'src/app/services/operations.service';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-painelcontrole',
  templateUrl: './painelcontrole.component.html',
  styleUrls: ['./painelcontrole.component.css', './painelcontrole.component.responsive.css']
})
export class PainelcontroleComponent implements OnInit {

  public nome = "";
  public saldo = 0;
  public mostrarSaldo = false;
  formLoan!: FormGroup;
  formInvestment!: FormGroup;
  LoanId: any[] = ['41527045-fead-4505-880c-1ba8197329a0', '159598df-bd76-4da0-b204-9fc3795d34fc'];
  InvestmentId: any[] = ['31a8200d-62ba-4d47-bfb1-061f0a58b7df', '59b1d5c1-046c-498b-8885-4f4710a14e18'];
  loanResult!: any;
  investmentResult!: any;
  authToken = localStorage.getItem('authToken');
  authObject = JSON.parse(this.authToken!);

  constructor(private fb: FormBuilder, private planService: PlanService, private operationService: OperationService, private router: Router) 
  {
    this.createFormLoan();
    this.createFormInvestment();
  }

  ngOnInit() {
    this.nome = this.authObject.user.completeName;
  }

  createFormLoan() {
    this.formLoan = this.fb.group({
      valuePlan: ['', [Validators.required]],
      transactionWay: [''], 
      userID: [''], 
      userName: [''], 
      email: [''], 
      isActive: [''],
      paymentTerm: ['',  [Validators.required]],
      interestRate: ['', [Validators.required]] 
    });
  }

  
  setLoanValues(){
    this.formLoan.patchValue({
      transactionWay: "pix",
      userID: this.authObject.user.id,
      userName: this.authObject.user.userName,
      email: this.authObject.user.email,
      isActive: true,
      paymentTerm: this.loanResult.paymentTerm,
      interestRate: this.loanResult.interestRate
   });
  }

  newLoan(loan: LoanOperation){
    this.operationService.postLoanPlan(loan).subscribe(
      (retorno: string | any) => {
        console.log(retorno);
        alert("A Operação foi completada com sucesso!")
      },
      (erro: any) => {
        console.log(erro);
        alert("Não foi possível completar a operação!");
      }
    );
  }

  SubmitLoan(){
    this.newLoan(this.formLoan.value);
  }

  updateFormLoan()
  {
    this.getLoanPlan();
    setTimeout(() => {
      this.setLoanValues();
    }, 500);
  }

  getLoanPlan(){
    if(this.formLoan.get("valuePlan")?.value > 0 && this.formLoan.get("valuePlan")?.value <= 1500)
    {
      this.planService.getLoanById(this.LoanId[0]).subscribe(
        (retorno: LoanPlan | any) => {
          // console.log(retorno);
          this.loanResult = retorno;
          // console.log(this.loanResult.paymentTerm)
        },
        (erro: any) => {
          console.log(erro);
          // alert("O plano não existe!");
        }
      );
    }
    else if (this.formLoan.get("valuePlan")?.value > 1500 && this.formLoan.get("valuePlan")?.value <= 3000)
    {
      this.planService.getLoanById(this.LoanId[1]).subscribe(
        (retorno: LoanPlan | any) => {
          console.log(retorno);
          this.loanResult = retorno;
        },
        (erro: any) => {
          console.log(erro);
          // alert("O plano não existe!");
        }
      );
    }
  }

  createFormInvestment() {
    this.formInvestment = this.fb.group({
      valuePlan: ['', [Validators.required]],
      transactionWay: [''], 
      userID: [''], 
      userName: [''], 
      email: [''], 
      isActive: [''],
      returnRate: ['', [Validators.required]],
      returnDeadLine: [''],
    });
  }

  getInvestmentPlan(){
    if(this.formInvestment.get("valuePlan")?.value == 0) { alert("Informe um valor maior que 0") }
    if(this.formInvestment.get("valuePlan")?.value > 0 && this.formInvestment.get("valuePlan")?.value <= 1500)
    {
      this.planService.getInvestmentById(this.InvestmentId[0]).subscribe(
        (retorno: InvestmentPlan | any) => {
          // console.log(retorno);
          this.investmentResult = retorno;
        },
        (erro: any) => {
          console.log(erro);
          // alert("O plano não existe!");
        }
      );
    }
    else if (this.formInvestment.get("valuePlan")?.value > 1500 && this.formInvestment.get("valuePlan")?.value <= 3000)
    {
      this.planService.getInvestmentById(this.InvestmentId[1]).subscribe(
        (retorno: InvestmentPlan | any) => {
          console.log(retorno);
          this.investmentResult = retorno;
        },
        (erro: any) => {
          console.log(erro);
          // alert("O plano não existe!");
        }
      );
    }
  }

  setInvestmentValues(){
    this.formInvestment.patchValue({
      transactionWay: "pix",
      userID: this.authObject.user.id,
      userName: this.authObject.user.userName,
      email: this.authObject.user.email,
      isActive: true,
      returnRate: this.investmentResult.returnRate,
      returnDeadLine: this.investmentResult.returnDeadLine
   });
  }

  SubmitInvestment(){
    this.newInvestment(this.formInvestment.value);
  }

  newInvestment(inv: InvestmentOperation){
    this.operationService.postInvestmentPlan(inv).subscribe(
      (retorno: string | any) => {
        console.log(retorno);
        alert("A Operação foi completada com sucesso!")
      },
      (erro: any) => {
        console.log(erro);
        alert("Não foi possível completar a operação!");
      }
    );
  }

  updateFormInvestment()
  {
    this.getInvestmentPlan();
    setTimeout(() => {
      this.setInvestmentValues();
    }, 500);
  }
  

  showBalance(){
    this.mostrarSaldo = !this.mostrarSaldo;
  }

  logOut(){
    localStorage.removeItem("authToken");
    this.router.navigate(['/login']);
  }

}
