import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PainelcontroleComponent } from './features/painelcontrole/painelcontrole.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'painelcontrole', component: PainelcontroleComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  }) 
  export class AppRoutingModule { }