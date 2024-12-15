import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  private tokenKey = 'authToken';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;
      this.authService.login(loginData).subscribe(
        (response) => {
          this.setToken(response.token); 
          console.log('Login successful:', response);
          this.router.navigateByUrl('/home');
        }
      )
    }
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}
