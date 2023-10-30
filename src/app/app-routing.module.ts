import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PainelcontroleComponent } from './painelcontrole/painelcontrole.component';

const routes: Routes = [
    { path: '', redirectTo: 'painelcontrole', pathMatch: 'full' },
    { path: 'painelcontrole', component: PainelcontroleComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }