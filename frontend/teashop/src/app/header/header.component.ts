import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../token.service'
import { Observable } from 'rxjs'
import { SharedService } from '../users/shared.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isSignedIn: boolean;
  userType: number;
  sub$;

  constructor(private tokenService: TokenService, private shared: SharedService) {
  }


  signOut() {
    this.userType = NaN;
    this.tokenService.clearToken();
    this.shared.signIn(false)
    this.shared.isUserOnline.subscribe((res) => {
      this.isSignedIn = res
    });
  }

  ngOnInit() {
    this.shared.signIn((this.tokenService.getToken()) ? true : false);
    this.shared.isUserOnline.subscribe((res) => {
      this.isSignedIn = res
      this.tokenService.getUserType().subscribe(user => {
        this.userType = parseInt(user["userType"])
      });
    });
  }

  ngOnDestroy(): void {
    if (this.sub$) this.sub$.unsubscribe();
  }
}
