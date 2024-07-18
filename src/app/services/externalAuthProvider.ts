import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ExternalAuth } from '../interfaces/externalAuth';
import { AuthResponse } from '../interfaces/authResponse';
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ExternalAuthProvider {
  user!: SocialUser;
  loggedIn: boolean = false;

  constructor(
    private socialService: SocialAuthService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private snackBar: MatSnackBar 
  ) {}

  ExternalAuth(): void {
    this.socialService.authState.subscribe((user) => {
      this.user = user;

      if (user && !this.loggedIn) {
        this.loggedIn = true;
        const externalAuth: ExternalAuth = {
          provider: user.provider,
          idToken: user.idToken,
        };

        this.userService.externalLogin(externalAuth).subscribe(
          (response: AuthResponse) => {
            if (response.isAuthSuccessful) { 

              this.spinner.show();

              sessionStorage.setItem('userData', JSON.stringify(response));

              setTimeout(() => {
                this.spinner.hide();
                this.snackBar.open('Login externo realizado com sucesso!', 'Fechar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  panelClass: ['snackbar-success'] 
                });
                this.router.navigate(['/painelcontrole']);
              }, 4000); 
            } else {
              console.error("Autenticação falhou:", response); 
            }
          },
          (error: HttpErrorResponse) => { 
            console.error("Erro na autenticação:", error); 
            this.snackBar.open('Erro ao realizar o login externo!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              panelClass: ['snackbar-error'] 
            });
            this.socialService.signOut().then(() => {
              this.loggedIn = false;
            });
          }
        );
      }
    });
  }

  SignOutExternal() {
    this.socialService.signOut().then(() => {
      this.loggedIn = false;
    });
  }
}
