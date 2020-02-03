import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { TeaListComponent } from './teas/tea-list/tea-list.component';
import { TeaDetailComponent } from './teas/tea-detail/tea-detail.component';
import { TeaCreateReactiveComponent } from './teas/tea-create-reactive/tea-create-reactive.component';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './app-material.module';
import { BlogModule } from './blog/blog.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeaListComponent,
    TeaDetailComponent,
    TeaCreateReactiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    BlogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
