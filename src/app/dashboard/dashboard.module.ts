import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbButtonModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { MainPageComponent } from './main-page/main-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    RouterModule,
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
