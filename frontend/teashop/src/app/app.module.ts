import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { TeaListComponent } from './shop/components/tea/tea-list/tea-list.component';
import { TeaDetailComponent } from './shop/components/tea/tea-detail/tea-detail.component';
import { TeaCreateReactiveComponent } from './shop/components/tea/tea-create-reactive/tea-create-reactive.component';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app-material.module';
import { BlogModule } from './blog/blog.module';
import { UsersModule } from './users/users.module'
import { SharedModule } from './shared.module';
import { TeaCardComponent } from './shop/components/tea/tea-list/tea-card.component';
import { ReviewAddDialogComponent } from './shop/components/review-add-dialog/review-add-dialog.component';
import { AppHttpInterceptor } from "./app.http.interceptor";
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeaListComponent,
    TeaDetailComponent,
    TeaCreateReactiveComponent,
    TeaCardComponent,
    ReviewAddDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    BlogModule,
    SharedModule,
    UsersModule,
    AngularEditorModule
  ],
  entryComponents: [
    ReviewAddDialogComponent
  ],
  providers: [[{ provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
