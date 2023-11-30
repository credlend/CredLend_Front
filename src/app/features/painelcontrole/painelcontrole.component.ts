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
  id: any[] = ['0ee79c88-05dd-4312-bcaa-ab7f4be04ff9', '2e5a1c6d-210e-4d09-9c5c-14395a91cd13'];
  idInvestment: any[] = ['04f55ce7-9975-403b-9094-b2a43c18977c', 'de69f98f-c4cb-4e70-b82e-9ae5b897cf2f'];
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
      typePlan: [''],
      valuePlan: ['', [Validators.required]],
      transactionWay: [''], 
      userID: [''], 
      userName: [''], 
      email: [''], 
      operationDate: [''],
      isActive: [''],
      paymentTerm: ['',  [Validators.required]],
      interestRate: ['', [Validators.required]] 
    });
  }

  
  setLoanValues(){
    this.formLoan.patchValue({
      typePlan: this.loanResult.typePlan,
      transactionWay: "pix",
      userID: this.authObject.user.id,
      userName: this.authObject.user.userName,
      email: this.authObject.user.email,
      operationDate: new Date(),
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
    if(this.formLoan.get("valuePlan")?.value > 0 && this.formLoan.get("valuePlan")?.value <= 2000)
    {
      this.planService.getLoanById(this.id[0]).subscribe(
        (retorno: LoanPlan | any) => {
          // console.log(retorno);
          this.loanResult = retorno;
          // console.log(this.loanResult.paymentTerm)
        },
        (erro: any) => {
          console.log(erro);
          alert("O plano não existe!");
        }
      );
    }
    else if (this.formLoan.get("valuePlan")?.value > 2000 && this.formLoan.get("valuePlan")?.value <= 4000)
    {
      this.planService.getLoanById(this.id[1]).subscribe(
        (retorno: LoanPlan | any) => {
          console.log(retorno);
          this.loanResult = retorno;
        },
        (erro: any) => {
          console.log(erro);
          alert("O plano não existe!");
        }
      );
    }
  }

  createFormInvestment() {
    this.formInvestment = this.fb.group({
      typePlan: [''],
      valuePlan: ['', [Validators.required]],
      transactionWay: [''], 
      userID: [''], 
      userName: [''], 
      email: [''], 
      operationDate: [''],
      isActive: [''],
      returnRate: ['', [Validators.required]],
      returnDeadLine: [''],
    });
  }

  getInvestmentPlan(){
    if(this.formInvestment.get("valuePlan")?.value == 0) { alert("Informe um valor maior que 0") }
    if(this.formInvestment.get("valuePlan")?.value > 1300 && this.formInvestment.get("valuePlan")?.value <= 2800)
    {
      this.planService.getInvestmentById(this.idInvestment[0]).subscribe(
        (retorno: InvestmentPlan | any) => {
          // console.log(retorno);
          this.investmentResult = retorno;
        },
        (erro: any) => {
          console.log(erro);
          alert("O plano não existe!");
        }
      );
    }
    else if (this.formInvestment.get("valuePlan")?.value > 2800 && this.formInvestment.get("valuePlan")?.value <= 4000)
    {
      this.planService.getInvestmentById(this.idInvestment[1]).subscribe(
        (retorno: InvestmentPlan | any) => {
          console.log(retorno);
          this.investmentResult = retorno;
        },
        (erro: any) => {
          console.log(erro);
          alert("O plano não existe!");
        }
      );
    }
  }

  setInvestmentValues(){
    this.formInvestment.patchValue({
      typePlan: this.investmentResult.typePlan,
      transactionWay: "pix",
      userID: this.authObject.user.id,
      userName: this.authObject.user.userName,
      email: this.authObject.user.email,
      operationDate: new Date(),
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
    localStorage.clear();
    this.router.navigate(['/login']);
  }



}
