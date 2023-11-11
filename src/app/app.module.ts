import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainelcontroleComponent } from './features/painelcontrole/painelcontrole.component';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './features/home/home.component';
import { TelaCadastroComponent } from './features/tela-cadastro/tela-cadastro.component';
import { TelaLoginComponent } from './features/tela-login/tela-login.component';


@NgModule({
  declarations: [
    AppComponent,
    PainelcontroleComponent,
    HomeComponent,
    TelaCadastroComponent,
    TelaLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // BsDropdownModule.forRoot(),
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
