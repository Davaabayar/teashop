import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
} from "@angular/material";

import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {AppRoutingModule} from './app-routing.module';

import { TeaCreateComponent } from './teas/tea-create/tea-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { TeaListComponent } from './teas/tea-list/tea-list.component';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';


const MY_ROUTES : Routes = [
  // {path:'', redirectTo:'home', pathMatch:'full'},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }
];

@NgModule({
  declarations: [
    AppComponent,
    TeaCreateComponent,
    HeaderComponent,
    TeaListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(MY_ROUTES),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
