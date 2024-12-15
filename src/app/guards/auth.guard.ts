import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})

export class AuthGuard implements CanActivate {

  private tokenKey = 'auth-token';

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem(this.tokenKey);

    if (token) {
      // Si el token existe, permite el acceso
      return true;
    } else {
      // Si no hay token, redirige al login y bloquea el acceso
      this.router.navigate(['/login'], {
        queryParams: { error: 'auth-required' },
      });
      return false;
    }
  }
}