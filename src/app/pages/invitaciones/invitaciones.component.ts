// invitaciones.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvitacionesService } from '../../services/invitaciones.service';
import { Invitation } from '../../interfaces/invitation';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invitaciones',
  templateUrl: './invitaciones.component.html',
  styleUrls: ['./invitaciones.component.css']
})
export class InvitacionesComponent implements OnInit {
  displayedColumns: string[] = ['nombreInvitado', 'fechaHoraEntrada', 'fechaCaducidad', 'qrCode', 'actions'];
  dataSource = new MatTableDataSource<Invitation>();
  showCreateModal: boolean = false;
  invitationForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private invitationService: InvitacionesService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.invitationForm = this.fb.group({
      nombreInvitado: ['', Validators.required],
      fechaHoraEntrada: ['', Validators.required],
      fechaCaducidad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInvitations();
  }

  loadInvitations(): void {
    this.invitationService.getInvitations()
      .then((data) => {
        console.log(data);
        this.dataSource.data = data.invitations;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch(error => {
        Swal.fire('Error', 'No se pudieron cargar las invitaciones', 'error');
      });
  }

  openCreateDialog(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  onSubmit(): void {
    if (this.invitationForm.valid) {
      this.invitationService.createInvitation(this.invitationForm.value)
        .then(() => {
          this.loadInvitations();
          this.closeCreateModal();
          Swal.fire('Invitación Creada', 'La invitación ha sido creada correctamente', 'success');
        })
        .catch(error => {
          console.log(error);
          Swal.fire('Error', 'No se pudo crear la invitación', 'error');
        });
    }
  }

  deleteInvitation(id: string): void {
    this.invitationService.deleteInvitation(id)
      .then(() => {
        this.loadInvitations();
        Swal.fire('Eliminado', 'La invitación ha sido eliminada', 'success');
      })
      .catch(error => {
        Swal.fire('Error', 'No se pudo eliminar la invitación', 'error');
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
