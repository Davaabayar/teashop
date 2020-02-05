import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { SignUp } from './components/signUp.component';
import { Quiz } from './components/quiz.components';
import { SignIn } from './components/signIn.components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from "../app-material.module";
import {MatRadioModule} from "@angular/material/radio";

const routes: Routes = [
  { path: '', component: UsersComponent},
  { path: 'signup', component: SignUp},
  { path: 'quiz', component: Quiz},
  { path: 'signin', component: SignIn}
];

@NgModule({
  declarations: [
    UsersComponent,
    SignUp,
    Quiz,
    SignIn
  ],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		MaterialModule,
		MatRadioModule
	],
  bootstrap: [UsersComponent]
})
export class UsersModule { }
