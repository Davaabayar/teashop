import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSignedIn
  constructor(private tokenService: TokenService) {}

  signOut() {
    this.tokenService.clearToken()
    this.isSignedIn = false
  }

  ngOnInit() {
    this.isSignedIn = (this.tokenService.getToken()) ? true : false
  }
}
