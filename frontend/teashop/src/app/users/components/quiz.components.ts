import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';
import { TokenService } from '../../token.service'

@Component({
    selector: 'quiz',
    template: `
    <mat-horizontal-stepper [linear]="false" #stepper>
        <mat-step >
            <div>Step 1</div>
            <div id="card-container">
                <div class="quiz-box" (click)="quizClick(1,'flavors','bitter',stepper)">
                    <div class="quiz-header quiz-h-1"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">body</div>
                    </div>
                </div>
                <div class="quiz-box" (click)="quizClick(1,'flavors','sweet',stepper)">
                    <div class="quiz-header quiz-h-2"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">body</div>
                    </div>
                </div>
            </div>
        </mat-step>
        <mat-step >
            <div>Step 2</div>
            <div id="card-container">
                <div class="quiz-box" (click)="quizClick(2,'benefits','Good for Heart',stepper)">
                    <div class="quiz-header quiz-h-3"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">body</div>
                    </div>
                </div>
                <div class="quiz-box" (click)="quizClick(2,'benefits','Good for Sleep',stepper)">
                    <div class="quiz-header quiz-h-4"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">body</div>
                    </div>
                </div>
            </div>
        </mat-step>
        <mat-step>
            <div>Step 3</div>
            <div id="card-container">
                <div class="quiz-box" (click)="quizClick(3,'benefits','Cold',stepper)">
                    <div class="quiz-header"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">body</div>
                    </div>
                </div>
                <div class="quiz-box" (click)="quizClick(3,'benefits','Hot',stepper)">
                    <div class="quiz-header"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">body</div>
                    </div>
                </div>
            </div>
        </mat-step>
        <mat-step >
            <div>Step 4</div>
            <div id="card-container">
                <div class="quiz-box">
                    <div class="quiz-header"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">body</div>
                    </div>
                </div>
                <div class="quiz-box">
                    <div class="quiz-header"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">body</div>
                    </div>
                </div>
            </div>
        </mat-step>
        <mat-step >
            <div>Hello 2</div>
        </mat-step>
        <mat-step>
            <div>Hello 3</div>
        </mat-step>
    </mat-horizontal-stepper>
  `,
    styleUrls: ['../users.component.css']
})
export class Quiz implements OnInit {
    private Subscription: Subscription
    private quizAns = {
        flavors: {},
        benefits: {}
    }
    constructor(private fb: FormBuilder, private userService: UserService, private tokenService: TokenService, private router: Router) { }

    quizClick(index, type, tag, stepper) {
        this.quizAns[type][index] = tag
        if(parseInt(index) == 3) {
            this.userService.sendQuiz({'token': this.tokenService.getToken(), 'quiz': this.quizAns}).subscribe(res => {
                this.router.navigateByUrl('/blog')
            })
        } else {
            stepper.next()
        }
    }
    ngOnInit() {
        // this.Subscription = this.userService.getQuiz(0).subscribe(res => {
        //     console.log(res)
        // })
    }
}
