import { Routes } from '@angular/router';
import { AppUserComponent } from './app-user/app-user.component';
import { ClientComponent } from './client/client.component';


export const OthersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: AppUserComponent,
        data: { title: 'User', breadcrumb: 'User' }
      },
      {
        path: 'clients',
        component: ClientComponent,
        data: { title: 'Client', breadcrumb: 'Client' }
      }
    ]
  }
];