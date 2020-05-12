import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbThemeModule, NbSidebarModule } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email'
        })
      ],
      forms: {}
    }),
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
