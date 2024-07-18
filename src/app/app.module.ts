import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainelcontroleComponent } from './features/painelcontrole/painelcontrole.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './features/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/authinterceptor';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TelaLoginComponent } from './features/tela-login/tela-login.component';
import { TelaCadastroComponent } from './features/tela-cadastro/tela-cadastro.component';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
  GoogleInitOptions,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { environment } from 'src/enviroments/enviroment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    PainelcontroleComponent,
    HomeComponent,
    TelaCadastroComponent,
    TelaLoginComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxSpinnerModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.clientId, 
              (() => {
                const googleLoginOptions: GoogleInitOptions = {
                  oneTapEnabled: true,
                };
              
                // Verificação para suporte a useFedCMForPrompt:
                if ('useFedCMForPrompt' in googleLoginOptions) {
                 googleLoginOptions.useFedCMForPrompt = true;
                }
              
                return googleLoginOptions;
              })()
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    provideNgxMask(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
})
export class AppModule {}
