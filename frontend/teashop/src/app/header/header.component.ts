import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service'
import { timingSafeEqual } from 'crypto';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSignedIn
  constructor(private tokenService: TokenService) { 
    this.isSignedIn = false 
  }

  signOut() {
    this.tokenService.clearToken()
    this.isSignedIn = false 
  }

  ngOnInit() {
    console.log(this.tokenService.getToken())
    this.isSignedIn = (this.tokenService.getToken()) ? true : false
    console.log(this.isSignedIn)
  }
}
