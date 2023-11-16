import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css']
})
export class TelaCadastroComponent implements OnInit {

  public title = 'CredLendFront';
  public formCadastro!: FormGroup;
  token!: string;


  constructor(private fb: FormBuilder, private userService: UserService) {
    this.criarForm();
   }

  ngOnInit(): void {
  
  }

  criarForm() {
    this.formCadastro = this.fb.group({
      id: [''],
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      confirmsenha: ['', [Validators.required]]
    });
  }

  salvarUser(user: User){
    this.userService.post(user).subscribe(
      (retorno: User | any) => {
        console.log(retorno);
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  userSubmit() {
    console.log(this.formCadastro.value);
    this.salvarUser(this.formCadastro.value);
  }


}
