import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';

@Component({
    selector: 'sign-up',
    template: `
    <div id="form-wrapper">
        <form [formGroup]="myForm" id="signup-form" (ngSubmit)="onSubmit()">
            <div class="signup-form-div">
                <div>
                    <label for="name">FullName</label>
                </div>
                <input type="text" name="name" placeholder="FulleName" [formControl]="myForm.get('fullname')">
            </div>
            <div>
                <div>
                    <label for="phone">Phone</label>
                </div>
                <input type="text" name="phone" placeholder="Phone" [formControl]="myForm.get('phone')">
            </div>
            <div>
                <div>
                    <label for="password">Password</label>
                </div>
                <input type="password" name="password" placeholder="Password" [formControl]="myForm.get('password')">
            </div>
            <div>
                <div>
                    <label for="verified-password">Verify Password</label>
                </div>
                <input type="password" name="verified-password" placeholder="Verify Password">
            </div>
            <input type="submit" value="Submit">
        </form> 
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
            'phone': ['', Validators.required],
            'password': ['', Validators.required]
        })
    }

    onSubmit() {
        console.log('You submitted value : ', this.myForm.value)
        this.Subscription = this.userService.signUp(this.myForm.value).subscribe(response => {
            if(response) {
                this.router.navigateByUrl('/users/quiz')
            }
        })
    }

    ngOnInit() {

    }
}
