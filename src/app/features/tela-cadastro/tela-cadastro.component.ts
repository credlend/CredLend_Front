import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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


  constructor(private fb: FormBuilder, private userService: UserService, private roleService: RoleService) {
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
    this.userService.postRegister(user).subscribe(
      (retorno: User | any) => {
        console.log(retorno);
      },
      (erro: any) => {
        alert("Informe valores válidos!")
        console.log(erro);
      }
    );
  }

  Submit() {
    setTimeout(() => {
      this.roleSubmit();
    }, 2000);
  }

  userSubmit() {
    console.log(this.formCadastro.value);
    this.saveUser(this.formCadastro.value);
  }

  roleSubmit() {
    this.patchValueRole();
    this.putRole(this.formRole.value);
    console.log(this.formRole.value)
  }

  putRole(role: Role) {
    this.roleService.put(role).subscribe(
      (retorno: Role | any) => {
        console.log(retorno);
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

}
