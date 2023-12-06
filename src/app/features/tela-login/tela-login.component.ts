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
  erros: number = 0;
  sucesso!: boolean;
  notificationOpened!: boolean;

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
    this.notificationOpened = true;
    setTimeout(() => {
      this.userService.postLogin(user).subscribe(
        (token: string | any) => {
          this.spinner.hide();
          this.requiredForm = true
          setTimeout(() => {
            this.toastNotification(true);
            console.log(token);
            localStorage.setItem('authToken', token);
            setTimeout(() => {
              this.router.navigate(["/painelcontrole"]);
              this.notificationOpened = false;
            }, 4100);
          }, 100);
        },
        (erro: any) => {
          this.spinner.hide();
          this.requiredForm = false
          setTimeout(() => {
            this.toastNotification(false);
            console.log(erro);
            setTimeout(() => {
              this.notificationOpened = false;
            }, 3500);
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

  showErros() {
    if (this.formLogin.get('email')?.invalid) {
      this.erros = 1;
    }
    else if (this.formLogin.get('email')?.valid && this.formLogin.get('password')?.invalid) {
      this.erros = 2;
    }
    else if (this.formLogin.get('password')?.valid && this.formLogin.invalid) {
      this.erros = 3;
    }
    else if (this.formLogin.valid)
      this.erros = 0;
  }

  toastNotification(success: boolean) {
    const toast = document.querySelector(".noti");
    const progressBar = document.querySelector(".progress");
    
    if(success){
      this.sucesso = true;  
    }
    else if(!success){
      this.sucesso = false;
    }

    toast!.classList.add("active");
    progressBar!.classList.add("active");

    setTimeout(() => {
      toast!.classList.remove("active");
    }, 3400);
    
    setTimeout(() => {
      progressBar!.classList.remove("active");
    }, 4000);
  }
}
