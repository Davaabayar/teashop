import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sign-up',
    template: `
    <form action="" id="signup-form">
        <div class="signup-form-div">
            <div>
                <label for="name">FullName</label>
            </div>
            <input type="text" name="name" placeholder="FulleName">
        </div>
        <div>
            <div>
                <label for="phone">Phone</label>
            </div>
            <input type="text" name="phone" placeholder="Phone">
        </div>
        <div>
            <div>
                <label for="password">Password</label>
            </div>
            <input type="text" name="password" placeholder="Password">
        </div>
        <input type="submit" value="Submit">
    </form> 
  `,
    styleUrls: ['../users.component.css']
})
export class SignUp implements OnInit {

    constructor() { }

    ngOnInit() {

    }
}
