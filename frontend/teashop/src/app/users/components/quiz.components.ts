import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';

@Component({
    selector: 'quiz',
    template: `
        <h1>Quiz</h1>
        <div id="quiz-container">
            <div class="quiz-box" (click)="quizClick(1)">
                <div class="quiz-img-container">
                    <img src="assets/quiz/unnamed.jpg">
                </div>
                <div>
                    Bitter taste
                </div>
            </div>
            <div class="quiz-box">
                <div class="quiz-img-container">
                    <img src="assets/quiz/2.jpg">
                </div>
                <div>
                    Sweet taste
                </div>
            </div>
        </div>
  `,
    styleUrls: ['../users.component.css']
})
export class Quiz implements OnInit {
    private Subscription: Subscription
    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

    quizClick(num) {
        console.log(num)
        console.log('working')
    }
    ngOnInit() {
        this.Subscription = this.userService.getQuiz(0).subscribe(res => {
            console.log(res)
        })
    }
}
