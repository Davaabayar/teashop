import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { SignUp } from './components/signUp.component';
import { Quiz } from './components/quiz.components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


const routes: Routes = [
  { path: '', component: UsersComponent},
  { path: 'signup', component: SignUp},
  { path: 'quiz', component: Quiz}
];

@NgModule({
  declarations: [
    UsersComponent,
    SignUp,
    Quiz
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  bootstrap: [UsersComponent]
})
export class UsersModule { }
