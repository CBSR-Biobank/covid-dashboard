import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent
} from '@nebular/auth';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent
      },
      {
        path: 'login',
        component: NbLoginComponent
      },
      {
        path: 'register',
        component: NbRegisterComponent
      },
      {
        path: 'logout',
        component: NbLogoutComponent
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent
      }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

const config: ExtraOptions = {
  useHash: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
