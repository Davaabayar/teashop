import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app-material.module';
import { BlogModule } from './blog/blog.module';
import { UsersModule } from './users/users.module'
import { SharedModule } from './shared.module';
import { ReviewAddDialogComponent } from './shop/components/review-add-dialog/review-add-dialog.component';
import { AppHttpInterceptor } from "./app.http.interceptor";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ShopModule } from './shop/shop.module';
import { TeaAddDialogComponent } from './shop/components/tea/tea-add-dialog/tea-add-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
    ShopModule,
    SharedModule,
    UsersModule,
    AngularEditorModule
  ],
  entryComponents: [
    ReviewAddDialogComponent,
    TeaAddDialogComponent
  ],
  providers: [
    [
      { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
