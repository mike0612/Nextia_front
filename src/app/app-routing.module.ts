import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [

  { path: '', redirectTo:'/invitaciones', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule,
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
