import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UserManagementComponent } from './BusinessComponents/user-management/user-management.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards'
      },
      
      {
        path: 'usermanagement',
        component: UserManagementComponent,
        data: {
          title: 'UserManagementComponent'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
