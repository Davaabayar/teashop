import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ShopAddComponent } from './components/shop-add/shop-add.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../app-material.module";
import {ReactiveFormsModule} from "@angular/forms";

const MY_ROUTES = [
  { path: '', component: ShopListComponent },
  { path: 'detail/:id', component: ShopDetailComponent },
  { path: 'add', component: ShopAddComponent },
];

@NgModule({
  declarations: [ShopListComponent, ShopAddComponent, ShopDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MY_ROUTES),
    MaterialModule,
    ReactiveFormsModule
  ],
  bootstrap: [ShopListComponent],
})
export class ShopModule { }
