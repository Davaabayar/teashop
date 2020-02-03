import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';

@Component({
    selector: 'sign-up',
    template: `
    <div id="form-wrapper">
        <div id="card">
            <div id="card-heading">

            </div>
            <div id="card-body">
                <h2 id="card-title">User Info</h2>
                <form [formGroup]="myForm" id="signup-form" (ngSubmit)="onSubmit()">
                    <div class="input-group">
                        <input class="input-style" type="text" name="name" placeholder="FullName" [formControl]="myForm.get('fullname')">
                    </div>
                    <div class="input-group">
                        <input class="input-style" type="text" name="email" placeholder="Email" [formControl]="myForm.get('email')">
                    </div>
                    <div class="input-group">
                        <input class="input-style" type="password" name="password" placeholder="Password" [formControl]="myForm.get('password')">
                    </div>
                    <div class="input-group">
                        <input class="input-style" type="password" name="verified-password" placeholder="Verify Password">
                    </div>
                    <div class="form-btn">
                        <input type="submit" value="Submit">
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

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
        this.myForm = fb.group({
            'fullname': ['', Validators.required],
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        })
    }

    onSubmit() {
        console.log('You submitted value : ', this.myForm.value)
        this.Subscription = this.userService.signUp(this.myForm.value).subscribe(response => {
            if (response) {
                this.router.navigateByUrl('/users/quiz')
            }
        })
    }

    ngOnInit() {

    }
}
