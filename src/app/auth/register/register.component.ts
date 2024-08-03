import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      numeroDepartamento: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const user: User = this.signupForm.value;
      this.authService.signup(user)
        .then(() => {
          return this.authService.login(user.email, user.password);
        })
        .then(() => {
          Swal.fire('Registro Exitoso', 'Te has registrado y logueado correctamente', 'success');
          this.router.navigate(['/invitations']);
        })
        .catch(error => {
          Swal.fire('Error', error.error.msg, 'error');
        });
    }
  }
}
