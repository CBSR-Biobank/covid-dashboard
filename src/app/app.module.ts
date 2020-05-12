import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './http/jwt.interceptor';
import { RoleProvider } from './providers/role.provider';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: '/api',
          login: {
            endpoint: '/auth/login'
          },
          logout: {
            endpoint: ''
          },
          requestPass: {
            endpoint: '/users/forgotpass'
          },
          resetPass: {
            endpoint: '/users/passreset'
          },
          token: {
            class: NbAuthJWTToken,
            key: 'access_token'
          }
        })
      ],
      forms: {}
    }),
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: '*'
        },
        user: {
          edit: '*',
          parent: 'guest'
        }
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NbRoleProvider, useClass: RoleProvider }
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
