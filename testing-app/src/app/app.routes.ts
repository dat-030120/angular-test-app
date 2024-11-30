import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        // canActivate: [AuthForceLoginGuard,AuthCheckRole],
        children: [
            {
                path: '**',
                redirectTo: 'home',
            },
            {
                path: '',
                loadChildren: () =>
                  import('./layout/main/main.module').then(
                    (m) => m.MainModule,
                  ),
              },
        ],
        title: 'sale-app',
      },
   
   
   

];
