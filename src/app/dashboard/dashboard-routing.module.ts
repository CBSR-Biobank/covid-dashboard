import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  {
    path: '',
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MainPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
