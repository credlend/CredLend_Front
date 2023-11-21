import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent {
  title = 'CredLendLogin';
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService){
    this.createFormLogin();
  }

  createFormLogin() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  loginUser(user: User){
    this.userService.postLogin(user).subscribe(
      (token: string | any) => {
        console.log(token);
        localStorage.setItem('authToken', token);
      },
      (erro: any) => {
        console.log(erro);
        alert("O usuário não existe!")
      }
    );
  }

  Submit(){
    console.log(this.formLogin.value);
    this.loginUser(this.formLogin.value);
  }

}
