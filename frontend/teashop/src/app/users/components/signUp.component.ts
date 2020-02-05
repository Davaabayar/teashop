import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Observable, Subscription} from 'rxjs'
import {Router} from '@angular/router';
import {TokenService} from '../../token.service'

@Component({
  selector: 'sign-up',
  template: `
    <div id="form-wrapper">
      <div id="card">
        <div id="card-heading"></div>
        <div id="card-body">
          <h2 id="card-title-user">Sign Up</h2>
          <form [formGroup]="myForm" id="signup-form" (ngSubmit)="onSubmit()">
            <div class="input-group">
              <input class="input-style" type="text" name="name" placeholder="Name"
                     [formControl]="myForm.get('fullname')">
            </div>
            <div class="input-group" [ngClass]="{'error': myForm.get('email').hasError('invalid') == true}">
              <input class="input-style" type="text" name="email" placeholder="Email"
                     [formControl]="myForm.get('email')">
            </div>
            <span class="error-text" *ngIf="myForm.get('email').hasError('invalid') == true">Email already exists</span>
            <div class="input-group" [ngClass]="(myForm.hasError('different') ? 'error':'')">
              <input class="input-style" type="password" name="password" placeholder="Password"
                     [formControl]="myForm.get('password')">
            </div>
            <div class="input-group" [ngClass]="(myForm.hasError('different') ? 'error':'')">
              <input class="input-style " type="password" name="verified-password" placeholder="Verify Password"
                     [formControl]="myForm.get('verifyPassword')">
            </div>
            <span class="error-text" *ngIf="myForm.hasError('different')">Password mismatch</span>
            <label class="radio-style">Who are you? <br>
              <input class="radio-style" [formControl]="myForm.get('userType')" checked type="radio" name="user-type"
                     value="0"> Tea lover
              <input class="radio-style" [formControl]="myForm.get('userType')" type="radio" name="user-type" value="1">
              Shop owner
            </label>
            <div class="form-btn">
              <button type="submit" [ngClass]="{'disabled-btn': myForm.valid == false}" [disabled]="!myForm.valid">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../users.component.css']
})
export class SignUp implements OnInit {
  myForm: FormGroup
  private Subscription: Subscription
  private emailTimeout

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private tokenService: TokenService) {
    this.myForm = fb.group({
        'fullname': ['', Validators.required],
        'email': ['', Validators.required, [this.asyncEmailValidator.bind(this)]],
        'password': ['', Validators.required],
        'verifyPassword': ['', Validators.required],
        'userType': ['0', Validators.required]
      },
      {validators: this.checkPassword}
    )
  }

  onSubmit() {
    this.Subscription = this.userService.signUp(this.myForm.value).subscribe(response => {
      if (response.success == 1) {
        this.tokenService.setToken(response.token)
        if (response.userType == 1) this.router.navigateByUrl('/shop/add')
        else this.router.navigateByUrl('/users/quiz')
      }
    })
  }

  ngOnInit() {

  }


  checkPassword(group: FormGroup) {
    let password = group.value.password
    let verify = group.value.verifyPassword
    return (password == verify) ? null : {different: true}
  }

  asyncEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    clearTimeout(this.emailTimeout);
    return new Promise<any>((resolve, reject) => {
      this.emailTimeout = setTimeout(() => {
        this.userService.checkEmail(control.value)
        .subscribe(
          res => {
            if (res.exists == 1) resolve({invalid: true});
            else resolve(null);
          },
          error => resolve({invalid: true}));
      }, 600);
    });
  }
}

