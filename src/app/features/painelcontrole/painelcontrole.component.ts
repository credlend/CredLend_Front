import { Component } from '@angular/core';

@Component({
  selector: 'app-painelcontrole',
  templateUrl: './painelcontrole.component.html',
  styleUrls: ['./painelcontrole.component.css', './painelcontrole.component.responsive.css']
})
export class PainelcontroleComponent {

  public nome = "Leonardo";
  public saldo = 0;
  public mostrarSaldo = false;



  esconderMostrar(){
    this.mostrarSaldo = !this.mostrarSaldo;
  }

}
