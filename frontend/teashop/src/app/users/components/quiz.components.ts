import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';
import { TokenService } from '../../token.service'
import { SharedService } from '../shared.service'

@Component({
    selector: 'quiz',
    template: `
    <div id="type-text">
        <div id="benefits">
            <div class="ben-div">Benefits:</div>
            <div class="ben-div-text">{{selectedBenefits}}</div>
        </div>
        <div id="flavors">
            <div class="flav-div">Flavors:</div>
            <div class="flav-div-text">{{selectedFlavors}}</div>
        </div>
        <span id="done-btn" (click)="done()">Done</span>
    </div>
    <mat-horizontal-stepper [linear]="false" #stepper>
        <mat-step >
            <div id="card-container">
                <div class="quiz-box" (click)="quizClick(1,'benefits','Cold',stepper)">
                    <div class="quiz-header quiz-h-1"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">Cold</div>
                    </div>
                </div>
                <div class="quiz-box" (click)="quizClick(2,'benefits','Improve digestion',stepper)">
                    <div class="quiz-header quiz-h-2"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">Improve digestion</div>
                    </div>
                </div>
            </div>
        </mat-step>
        <mat-step >
            <div id="card-container">
                <div class="quiz-box" (click)="quizClick(3,'benefits','Boost immune system',stepper)">
                    <div class="quiz-header quiz-h-3"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">Boost immune system</div>
                    </div>
                </div>
                <div class="quiz-box" (click)="quizClick(4,'benefits','Good for Sleep',stepper)">
                    <div class="quiz-header quiz-h-4"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">Reduce inflammation</div>
                    </div>
                </div>
            </div>
        </mat-step>
        <mat-step>
            <div id="card-container">
                <div class="quiz-box" (click)="quizClick(5,'benefits','Anti-ageing',stepper)">
                    <div class="quiz-header quiz-h-5"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">Anti-ageing</div>
                    </div>
                </div>
                <div class="quiz-box" (click)="quizClick(6,'benefits','Relieve stress and anxiety',stepper)">
                    <div class="quiz-header quiz-h-6"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">Relieve stress and anxiety</div>
                    </div>
                </div>
            </div>
        </mat-step>
        <mat-step >
            <div id="card-container">
                <div class="quiz-box" (click)="quizClick(7,'benefits','Lower blood pressure',stepper)">
                    <div class="quiz-header quiz-h-7"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">Lower blood pressure</div>
                    </div>
                </div>
                <div class="quiz-box" (click)="quizClick(8,'benefits','Skin Health',stepper)">
                    <div class="quiz-header quiz-h-8"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">Skin Health</div>
                    </div>
                </div>
            </div>
        </mat-step>
        <mat-step >
        <div id="card-container">
                <div class="quiz-box" (click)="quizClick(9,'flavors','Sweet',stepper)">
                    <div class="quiz-header quiz-h-9"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">Sweet</div>
                    </div>
                </div>
                <div class="quiz-box" (click)="quizClick(10,'flavors','Bitter',stepper)">
                    <div class="quiz-header quiz-h-10"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">Bitter</div>
                    </div>
                </div>
            </div>
        </mat-step>
        <mat-step>
            <div id="card-container">
                <div class="quiz-box" (click)="quizClick(11,'flavors','Fruity',stepper)">
                    <div class="quiz-header quiz-h-11"></div>
                    <div class="quiz-body">
                        <div class="quiz-text">Fruity</div>
                    </div>
                </div>
            </div>
        </mat-step>
    </mat-horizontal-stepper>
  `,
    styleUrls: ['../users.component.css']
})
export class Quiz implements OnInit {
    private Subscription: Subscription
    selectedBenefits
    selectedFlavors
    quizAns = {
        flavors: {},
        benefits: {}
    }
    constructor(private fb: FormBuilder, private userService: UserService, private tokenService: TokenService, private router: Router, private shared: SharedService) { }

    quizClick(index, type, tag, stepper) {
        this.quizAns[type][index] = tag
        this.selectedBenefits = Object.values(this.quizAns.benefits).toString()
        this.selectedFlavors = Object.values(this.quizAns.flavors).toString()
        if (index < 11 && Object.keys(this.quizAns[type]).length % 2 == 0)
            stepper.next()
    }

    done() {
        this.userService.sendQuiz({ 'token': this.tokenService.getToken(), 'quiz': this.quizAns }).subscribe(res => {
            this.tokenService.setToken(res.token)
            this.shared.signIn(true)
            this.shared.isUserOnline.subscribe((res) => { });
            this.router.navigateByUrl('/blog')
        })
    }

    ngOnInit() {

    }
}
