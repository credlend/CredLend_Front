import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css']
})
export class TelaCadastroComponent {

  public title = 'CredLendFront';
  public formCadastro!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.criarForm();
   }

  ngOnInit(): void { }

  criarForm() {
    this.formCadastro = this.fb.group({
      id: [''],
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      email:['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }
}
