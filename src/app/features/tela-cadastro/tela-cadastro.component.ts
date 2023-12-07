import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { CustomValidator } from 'src/app/services/customValidators';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css']
})
export class TelaCadastroComponent implements OnInit {

  public title = 'CredLendFront';
  public formCadastro!: FormGroup;
  public formRole!: FormGroup;
  token!: string;
  todayDate: Date = new Date();
  requiredForm: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService, private roleService: RoleService, private spinner: NgxSpinnerService, private router: Router) {
    this.createFormUser();
    this.createFormRole();
  }

  ngOnInit(): void {
  }

  createFormUser() {
    this.formCadastro = this.fb.group({
      completeName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      cpf: ['', [Validators.required, CustomValidator.isValidCpf()]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidator.senhaComplexaValidator]],
      confirmPassword: ['', [Validators.required]],
      isActive: [true]
    }, { validators: this.checkPasswords });
  }

  createFormRole() {
    this.formRole = this.fb.group({
      email: [''],
      role: [''],
      delete: [false]
    });
  }

  patchValueRole() {
    this.formRole.patchValue({
      email: this.formCadastro.get("email")?.value,
      role: "User",
      delete: false,
    });
  }

  replaceName() {
    let name = this.formCadastro.get("completeName")?.value.replace(/\s/g, "").replace(/[ãáâ]/g, "a");
    this.formCadastro.patchValue({
      userName: name
    });
    console.log(name);
  }

  saveUser(user: User) {
    setTimeout(() => {
      this.userService.postRegister(user).subscribe(
        (retorno: User | any) => {
          console.log(retorno);
          this.requiredForm = true    
        },
        (erro: HttpErrorResponse) => {
          if (erro.status === 200) {
            console.log(erro);
            setTimeout(() => {
              alert("Usuário cadastrado com sucesso!");
              this.spinner.hide();
              this.router.navigate(['/login']);
            }, 1000);
          }
          else {
            this.requiredForm = false
            alert("Informe valores válidos!");
            this.spinner.hide();
            console.log(erro);
          }
        }
      );
    }, 1000);
  }

  Submit() {
    this.spinner.show();
    setTimeout(() => {
      this.roleSubmit();
    }, 5000);
  }

  userSubmit() {
    console.log(this.formCadastro.value);
    this.saveUser(this.formCadastro.value);
  }

  roleSubmit() {
    this.patchValueRole();
    this.putRole(this.formRole.value);
    console.log(this.formRole.value);
  }

  putRole(role: Role) {
    this.roleService.put(role).subscribe(
      (retorno: Role | any) => {
        console.log(retorno);
        this.spinner.hide();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  actualDate() {
    debugger;
    // Obtém a data atual
    const todayDate = new Date();

    // Obtém o ano, o mês e o dia
    const ano = todayDate.getFullYear();
    const mes = todayDate.getMonth() + 1; // O mês começa em 0, então é preciso somar 1
    const dia = todayDate.getDate();

    // Formata a data com zeros à esquerda se necessário
    const dataFormatada = `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    // Retorna a data formatada
    return dataFormatada;
  }

}
