import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanPlan } from 'src/app/models/LoanPlan';
import { User } from 'src/app/models/User';
import { PlanService } from 'src/app/services/plan.service';
import { UserService } from 'src/app/services/user.service';

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
  id: string = "0ee79c88-05dd-4312-bcaa-ab7f4be04ff9";
  loanResult!: any;
  authToken = localStorage.getItem('authToken');
  authObject = JSON.parse(this.authToken!);

  constructor(private fb: FormBuilder, private planService: PlanService, private userService: UserService) 
  {
    this.createFormLoan();
  }

  ngOnInit() {
    this.nome = this.authObject.user.userName;
  }

  createFormLoan() {
    this.formLoan = this.fb.group({
      typePlan: [''],
      valuePlan: ['', [Validators.required]],
      transactionWay: [''], 
      userID: [''], 
      userName: [''], 
      email: [''], 
      operationDate: ['', [Validators.required]],
      isActive: [''],
      paymentTerm: [''],
      interestRate: ['', [Validators.required]] 
    });
  }
  
  setLoanValues(){
    this.formLoan.patchValue({
      typePlan: this.loanResult.get("typePlan").value,
      transactionWay: "pix",
      userID: this.authObject.user.id,
      userName: this.authObject.user.userName,
      email: this.authObject.user.email,
      isActive: true,
      paymentTerm: '',
   });
  }

  SubmitLoan(){
    console.log(this.formLoan.value);
    // this.loginUser(this.formLoan.value);
  }

  getLoanPlan(){
    this.planService.getLoanById(this.id).subscribe(
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
  

  esconderMostrar(){
    this.mostrarSaldo = !this.mostrarSaldo;
  }



}
