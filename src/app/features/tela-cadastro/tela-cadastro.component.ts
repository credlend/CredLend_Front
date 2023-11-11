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

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.formCadastro = this.fb.group({
      nome: [null, [Validators.required]],
      sobrenome: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required]],
      email:[null, [Validators.required]],
      senha: [null, [Validators.required]]
    });
  }
}
