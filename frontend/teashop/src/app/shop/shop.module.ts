import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ShopAddComponent } from './components/shop-add/shop-add.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../app-material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../shared.module";
import { ShopFindNearestComponent } from './components/shop-find-nearest/shop-find-nearest.component';

const MY_ROUTES = [
  { path: '', component: ShopListComponent },
  { path: 'detail/:id', component: ShopDetailComponent },
  { path: 'add', component: ShopAddComponent },
  { path: 'nearest', component: ShopFindNearestComponent },
];

@NgModule({
  declarations: [ShopListComponent, ShopAddComponent, ShopDetailComponent, ShopFindNearestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MY_ROUTES),
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    SharedModule
  ],
  bootstrap: [ShopListComponent],
})
export class ShopModule { }
