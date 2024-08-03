import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitacionesComponent } from './invitaciones/invitaciones.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';



@NgModule({
  declarations: [
    InvitacionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    RouterLink,
    ReactiveFormsModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    QRCodeModule
  ]
})
export class PagesModule { }
