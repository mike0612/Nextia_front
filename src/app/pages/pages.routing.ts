import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { authGuard } from '../guards/auth.guard';
import { InvitacionesComponent } from './invitaciones/invitaciones.component';

const routes: Routes = [
  {
    path: 'invitaciones',
    canActivate:[authGuard],
    children: [
      { path: '', component: InvitacionesComponent }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
