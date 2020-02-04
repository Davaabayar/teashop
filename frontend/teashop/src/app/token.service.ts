import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  clearToken() {
    localStorage.clear()
    this.router.navigateByUrl('/blog')
  }

  constructor(private router: Router) {
  }
}
