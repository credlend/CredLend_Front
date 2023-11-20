import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
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
      cpf: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      isActive: [true]
    });
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

}
