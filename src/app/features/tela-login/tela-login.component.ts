import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/User';
import { AuthInterceptor } from 'src/app/services/authinterceptor';
import { CustomValidator } from 'src/app/services/customValidators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent implements OnInit {
  title = 'CredLendLogin';
  formLogin!: FormGroup;
  requiredForm: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService, private spinner: NgxSpinnerService, private router: Router) {
    this.createFormLogin();
  }

  ngOnInit(): void {
    localStorage.removeItem("authToken");
  }

  createFormLogin() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidator.senhaComplexaValidator]]
    });
  }

  loginUser(user: User) {
    setTimeout(() => {
      this.userService.postLogin(user).subscribe(
        (token: string | any) => {
          this.spinner.hide();
          this.requiredForm = true
          setTimeout(() => {
            alert("Usuário logado com sucesso !");
            console.log(token);
            localStorage.setItem('authToken', token);
            this.router.navigate(["/painelcontrole"])
          }, 100);
        },
        (erro: any) => {
          this.spinner.hide();
          this.requiredForm = false
          setTimeout(() => {
            alert("O usuário não existe!");
            console.log(erro);
          }, 100);
        }
      );
    }, 1200);
  }

  Submit() {
    console.log(this.formLogin.value);
    this.loginUser(this.formLogin.value);
    this.spinner.show();
  }

}
