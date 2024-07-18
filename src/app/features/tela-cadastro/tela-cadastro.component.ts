import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/User';
import { CustomValidator } from 'src/app/services/customValidators';
import { ExternalAuthProvider } from 'src/app/services/externalAuthProvider';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css'],
})
export class TelaCadastroComponent implements OnInit {
  title = 'CredLendFront';
  formCadastro!: FormGroup;
  formRole!: FormGroup;
  token!: string;
  todayDate: Date = new Date();
  requiredForm: boolean = true;
  erros: number = 0;
  sucesso!: boolean;

  // Variável para controlar o tipo de mensagem do toast
  toastMessage = {
    isSuccess: false,
    message: '',
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private externalAuthProvider: ExternalAuthProvider
  ) {
    this.createFormUser();
    this.LoginWithGoogle();
  }

  ngOnInit(): void {
    sessionStorage.removeItem('userData');
  }

  createFormUser() {
    this.formCadastro = this.fb.group(
      {
        completeName: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        cpf: ['', [Validators.required, CustomValidator.isValidCpf()]],
        birthDate: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, CustomValidator.senhaComplexaValidator],
        ],
        confirmPassword: ['', [Validators.required]],
        isActive: [true],
      },
      { validators: this.checkPasswords }
    );
  }

  replaceName() {
    let name = this.formCadastro
      .get('completeName')
      ?.value.replace(/\s/g, '')
      .replace(/[ãáâ]/g, 'a');
    this.formCadastro.patchValue({
      userName: name,
    });
    console.log(name);
  }

  Submit() {
    this.spinner.show();
  }

  userSubmit() {
    console.log(this.formCadastro.value);
    this.saveUser(this.formCadastro.value);
  }

  saveUser(user: User) {
    this.userService.postRegister(user).subscribe(
      (response: any) => {
        this.spinner.hide();
        if (response.isSucceded) {
          this.showToast('success', 'Usuário cadastrado com sucesso!');
          sessionStorage.setItem('userData', JSON.stringify(response));
          setTimeout(() => {
            this.router.navigate(['/painelcontrole']);
          }, 4100);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.spinner.hide();
          console.error(error);
          this.showToast('error', 'Usuário já cadastrado.');
          setTimeout(() => {
            this.createFormUser();
          }, 4000);
        } else {
          this.spinner.hide();
          console.error(error);
          this.showToast('error', 'Não foi possível completar o cadastro.');
          setTimeout(() => {
            this.createFormUser();
          }, 4000);
        }
      }
    );
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  actualDate() {
    debugger;
    // Obtém a data atual
    const todayDate = new Date();

    // Obtém o ano, o mês e o dia
    const ano = todayDate.getFullYear();
    const mes = todayDate.getMonth() + 1; // O mês começa em 0, então é preciso somar 1
    const dia = todayDate.getDate();

    // Formata a data com zeros à esquerda se necessário
    const dataFormatada = `${ano}-${mes.toString().padStart(2, '0')}-${dia
      .toString()
      .padStart(2, '0')}`;

    // Retorna a data formatada
    return dataFormatada;
  }

  showToast(type: 'success' | 'error', message: string) {
    this.toastMessage = { isSuccess: type === 'success', message };

    const toast = document.querySelector('.noti');
    const progressBar = document.querySelector('.progress');

    toast?.classList.add('active');
    progressBar?.classList.add('active');

    // Define a classe de acordo com o tipo de mensagem
    if (type === 'success') {
      toast?.classList.add('success');
      toast?.classList.remove('error');
    } else {
      toast?.classList.add('error');
      toast?.classList.remove('success');
    }

    setTimeout(() => {
      toast?.classList.remove('active', 'success', 'error');
    }, 3400);

    setTimeout(() => {
      progressBar?.classList.remove('active');
    }, 4000);
  }

  LoginWithGoogle() {
    this.externalAuthProvider.ExternalAuth();
    
  }
}
