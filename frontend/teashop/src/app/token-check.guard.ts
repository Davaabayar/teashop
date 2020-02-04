import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class TokenCheckGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.getToken();
    if (token) return true;
    else return this.router.navigateByUrl('users/signin');
  }

}
