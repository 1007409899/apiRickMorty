import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router, } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router:Router) { }
  //un observable que emite o resulve on booleano o un boleano normal
  canActivate(): Observable<boolean> | boolean {
    return this.authService.isAuthenticated().pipe(
      tap(valid => {
        if (!valid) {
          this.router.navigateByUrl("/auth")
        }
      })
    )

  }
  canLoad(): Observable<boolean > | boolean  {
  return this.authService.isAuthenticated().pipe(
      tap(valid => {
        if (!valid) {
          this.router.navigateByUrl("/auth")
        }
      })
    )

  }


}
