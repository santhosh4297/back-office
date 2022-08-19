import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';


const oktaAuth = new OktaAuth({
  issuer: 'https://tide.okta-emea.com',
  clientId: '0oa8hkj0rd6Num2Wl0i7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
});

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, LoginComponent],
  imports: [
    HttpClientModule,
    OktaAuthModule,
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'manual-kyc',
          loadChildren: () =>
            import('manual-kyc/Module').then((m) => m.RemoteEntryModule),
        },
        {
          path: '',
          component: NxWelcomeComponent,
        },
        {
          path: 'login',
          component: LoginComponent
        },
        { path: 'login/callback', component: OktaCallbackComponent },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [
    { 
      provide: OKTA_CONFIG, 
      useValue: { oktaAuth } 
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
