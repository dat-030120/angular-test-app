import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuardFn } from '../core/guards/auth.guard';

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
        // canActivate:[authGuardFn],

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
        path: 'register',
        loadComponent: () =>
          import('./layout/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Đăng ký',
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
    title: 'sale-app',
  },
];
