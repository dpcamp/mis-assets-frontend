import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserSingleComponent } from './users/user-single/user-single.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserCreateComponent } from './users/user-create/user-create.component';

import { PhonesComponent } from './phones/phones.component';
import { PhoneListComponent } from './phones/phone-list/phone-list.component';
import { PhoneSingleComponent } from './phones/phone-single/phone-single.component';
import { PhoneCreateComponent } from './phones/phone-create/phone-create.component';
import { PhoneEditComponent } from './phones/phone-edit/phone-edit.component';

//import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'create',
        component: UserCreateComponent
      },
      {
        path: ':id',
        component: UserSingleComponent
      },
      {
        path: ':id/edit',
        component: UserEditComponent
      }
    ]
  },
  {
    path: 'phones',
    component: PhonesComponent,
      children: [
      {
        path: '',
        component: PhoneListComponent
      },
      {
        path: 'create',
        component: PhoneCreateComponent
      },
      {
        path: ':id',
        component: PhoneSingleComponent
       },
       {
        path: ':id/edit',
        component: PhoneEditComponent
       }
      ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);