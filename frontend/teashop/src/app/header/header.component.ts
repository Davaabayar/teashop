import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service'
import { Observable } from 'rxjs'
import { SharedService } from '../users/shared.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSignedIn: boolean;
  userType$ : Observable<any>;
  constructor(private tokenService: TokenService,private shared: SharedService) {}


  signOut() {
    this.tokenService.clearToken();
    this.shared.signIn(false)
    this.shared.isUserOnline.subscribe((res) => {
      this.isSignedIn = res
    });
  }

  ngOnInit() {
    this.userType$ = this.tokenService.getUserType();
    this.shared.signIn((this.tokenService.getToken()) ? true : false)
    this.shared.isUserOnline.subscribe((res) => {
      this.isSignedIn = res
    });
  }
}
