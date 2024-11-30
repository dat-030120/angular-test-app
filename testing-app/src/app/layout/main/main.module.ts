import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    // canActivate: [AuthForceLoginGuard,AuthCheckRole],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        // canActivate: [AuthForceLoginGuard,AuthCheckRole],
        loadComponent: () =>
          import(
            '../../page/home/home.component'
          ).then((m) => m.HomeComponent),
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
