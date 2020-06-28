import { Routes } from '@angular/router';
import { AppUserComponent } from './app-user/app-user.component';


export const OthersRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'users',
      component: AppUserComponent,
      data: { title: 'User', breadcrumb: 'User' }
    }]
  }
];