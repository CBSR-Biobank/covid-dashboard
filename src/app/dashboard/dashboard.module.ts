import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbSecurityModule } from '@nebular/security';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbUserModule
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartLegendComponent } from './components/chart-legend/chart-legend.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PatientGenderCardComponent } from './components/patient-gender-card/patient-gender-card.component';
import { PatientsPieCardComponent } from './components/patients-pie-card/patients-pie-card.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PositiveSymptomaticComponent } from './components/positive-symptomatic/positive-symptomatic.component';
import { NegativeSymptomaticComponent } from './components/negative-symptomatic/negative-symptomatic.component';
import { PatientComorbidityComponent } from './components/patient-comorbidity/patient-comorbidity.component';
import { BarChartCardComponent } from './components/bar-chart-card/bar-chart-card.component';
import { PatientAgeDistCardComponent } from './components/patient-age-dist/patient-age-dist.component';
import { AsymptomaticComorbidityComponent } from './components/asymptomatic-comorbidity/asymptomatic-comorbidity.component';
import { PositiveGenderAgeCardComponent } from './components/positive-gender-age-card/positive-gender-age-card.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbContextMenuModule,
    NbIconModule,
    NbLayoutModule,
    NbMenuModule,
    NbSecurityModule,
    NbSidebarModule,
    NbUserModule,
    NgxEchartsModule,
    RouterModule
  ],
  declarations: [
    MainPageComponent,
    HeaderComponent,
    PatientGenderCardComponent,
    PatientsPieCardComponent,
    ChartLegendComponent,
    PositiveSymptomaticComponent,
    NegativeSymptomaticComponent,
    PatientComorbidityComponent,
    BarChartCardComponent,
    PatientAgeDistCardComponent,
    AsymptomaticComorbidityComponent,
    PositiveGenderAgeCardComponent
  ]
})
export class DashboardModule {}
