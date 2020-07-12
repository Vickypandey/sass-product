import { Routes } from '@angular/router';
import { AppUserComponent } from './app-user/app-user.component';
import { ClientComponent } from './client/client.component';
import { LeadComponent } from './leads/leads.component'
import { ProfileComponent } from './profile/profile.component';
import { ClientAdminUserComponent } from './client-admin-user/client-admin-user.component';
import { ContactComponent } from './contact/contact.component';
import { ClientContactComponent } from './client-contact/client-contact.component';
import { ClientLeadComponent } from './client-leads/client-leads.component';


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
        path: 'client-users',
        component: ClientAdminUserComponent,
        data: { title: 'User', breadcrumb: 'User' }
      },
      {
        path: 'clients',
        component: ClientComponent,
        data: { title: 'Client', breadcrumb: 'Client' }
      },
      {
        path: 'leads',
        component: LeadComponent,
        data: { title: 'Lead', breadcrumb: 'Lead' }
      },
      {
        path: 'client-leads',
        component: ClientLeadComponent,
        data: { title: 'Lead', breadcrumb: 'Lead' }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Profile', breadcrumb: 'Profile' }
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: { title: 'Contact', breadcrumb: 'Contact' }
      },
      {
        path: 'client-contact',
        component: ClientContactComponent,
        data: { title: 'Contact', breadcrumb: 'Contact' }
      }
    ]
  }
];