import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    // canActivate: [AuthForceLoginGuard,AuthCheckRole],
    children: [
  
      {
        path: '',
        loadChildren: () =>
          import('./layout/main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./layout/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Đăng Nhập',
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
    title: 'sale-app',
  },
];
