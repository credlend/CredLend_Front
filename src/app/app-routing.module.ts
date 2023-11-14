import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PainelcontroleComponent } from './features/painelcontrole/painelcontrole.component';
import { HomeComponent } from './features/home/home.component';
import { TelaCadastroComponent } from './features/tela-cadastro/tela-cadastro.component';
import { TelaLoginComponent } from './features/tela-login/tela-login.component';

const routes: Routes = [
    { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'painelcontrole', component: PainelcontroleComponent },
    { path: 'cadastro', component: TelaCadastroComponent},
    { path: 'login', component: TelaLoginComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  }) 
  export class AppRoutingModule { }