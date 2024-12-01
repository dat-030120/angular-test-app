import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { authGuardFn } from '../../../core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import(
            '../../page/home/home.component'
          ).then((m) => m.HomeComponent),
          canActivate:[authGuardFn],

        title: 'Trang chủ',
      },
    ],
    title: 'sale-app',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainModule { }
