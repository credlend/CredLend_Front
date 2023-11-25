import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-painelcontrole',
  templateUrl: './painelcontrole.component.html',
  styleUrls: ['./painelcontrole.component.css', './painelcontrole.component.responsive.css']
})
export class PainelcontroleComponent {

  public nome = "Leonardo";
  public saldo = 0;
  public mostrarSaldo = false;
  formLoan!: FormGroup;

  constructor(private fb: FormBuilder) 
  {
    this.createFormLoan();
  }

  createFormLoan() {
    this.formLoan = this.fb.group({
      id: [''],
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

  SubmitLoan(){}

  esconderMostrar(){
    this.mostrarSaldo = !this.mostrarSaldo;
  }



}
