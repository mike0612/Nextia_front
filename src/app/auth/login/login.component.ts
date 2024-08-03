import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  recoverForm: FormGroup;
  showRecoverModal: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .then(() => {
          Swal.fire('Inicio de Sesión Exitoso', 'Has iniciado sesión correctamente', 'success');
          this.router.navigate(['/invitaciones']);
        })
        .catch(error => {
          console.log(error);
          Swal.fire('Error', error.error.msg, 'error');
        });
    }
  }

  openRecoverModal(): void {
    this.showRecoverModal = true;
  }

  closeRecoverModal(): void {
    this.showRecoverModal = false;
  }

  onRecoverSubmit(): void {
    if (this.recoverForm.valid) {
      this.authService.recoverPassword(this.recoverForm.value.email)
        .then(() => {
          Swal.fire('Recuperación de Contraseña', 'Hemos enviado un enlace de recuperación a su correo', 'success');
          this.closeRecoverModal();
        })
        .catch(error => {
          Swal.fire('Error', error.error.msg, 'error');
        });
    }
  }
}
