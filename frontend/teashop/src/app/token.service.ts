import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

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

  hasShop() {
    return this.http.get(environment.serverURL + '/shop/has');
  }

  getUserType() {
    return this.http.get(environment.serverURL + '/user/role');
  }


  clearToken() {
    localStorage.clear();
    this.router.navigateByUrl('/blog');
  }

  constructor(private router: Router, private http: HttpClient) {
  }
}
