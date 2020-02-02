import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { SignUp } from './components/signUp.component';


const routes: Routes = [
  { path: '', component: UsersComponent},
  { path: 'signup', component: SignUp}
];

@NgModule({
  declarations: [
    UsersComponent,
    SignUp
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  bootstrap: [UsersComponent]
})
export class UsersModule { }
