import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  showSuccessMessage = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() { }

  onRegister() {
    if (this.registerForm.valid) {
      const registerData: Register = this.registerForm.value;

      this.authService.register(registerData).subscribe(
        response => {
          console.log('Registro exitoso', response);
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.dismissSuccessMessage();
            this.router.navigate(['/login']);
          }, 3000);
        },
        error => {
          console.error('Error en el registro', error);
        }
      );
    }
  }

  dismissSuccessMessage() {
    this.showSuccessMessage = false;
  }
}
