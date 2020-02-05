import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { TokenService } from '../../token.service'
import { Subscription, Observable } from 'rxjs'
import { Router } from '@angular/router';
import { SharedService } from '../shared.service'

@Component({
    selector: 'sign-in',
    template: `
    <div id="form-wrapper">
        <div id="card">
            <div id="card-heading"></div>
            <div id="card-body">
                <h2 id="card-title-user">Sign In</h2>
                <form [formGroup]="form" id="signup-form" (ngSubmit)="onSubmit()">
                    <div class="input-group">
                        <input class="input-style" type="text" name="name" placeholder="Email" [formControl]="form.get('email')">
                    </div>
                    <div class="input-group">
                        <input class="input-style" type="password" name="password" placeholder="Password" [formControl]="form.get('password')">
                    </div>
                    <span class="error-text" *ngIf="failed == true">Password or Email doesn't match</span>
                    <div class="form-btn">
                        <button type="submit" [ngClass]="{'disabled-btn': form.valid == false}" [disabled]="!form.valid">Sign In</button>
                        <a class="signup-link" mat-button routerLink="/users/signup">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
  `,
    styleUrls: ['../users.component.css']
})
export class SignIn implements OnInit {
    form: FormGroup
    private Subscription: Subscription
    private failed
    constructor(private fb: FormBuilder, private tokenService: TokenService, private userService: UserService, private router: Router, private shared: SharedService) {
        this.form = fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        })
    }

    onSubmit() {        
        this.Subscription = this.userService.signIn(this.form.value).subscribe(response => {
            if(response.success == 1) {
                this.tokenService.setToken(response.token)
                this.shared.signIn(true)
                this.shared.isUserOnline.subscribe((res) => {
                    // this.posts$ = of(res);
                    console.log('res : '+res)
                });
                this.router.navigateByUrl('/blog')
            } else {
                this.failed = true
                this.form = this.fb.group({
                    'email': ['', Validators.required],
                    'password': ['', Validators.required]
                })
            }
        })
    }

    ngOnInit() {

    }
}

