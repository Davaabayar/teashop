import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ShopAddComponent } from './components/shop-add/shop-add.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../app-material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "../shared.module";
import { ShopFindNearestComponent } from './components/shop-find-nearest/shop-find-nearest.component';
import { TeaListComponent } from './components/tea/tea-list/tea-list.component';
import { TeaCreateReactiveComponent } from './components/tea/tea-create-reactive/tea-create-reactive.component';
import { TeaCardComponent } from './components/tea/tea-list/tea-card.component';
import { TeaDetailComponent } from './components/tea/tea-detail/tea-detail.component';
import { ReviewAddDialogComponent } from './components/review-add-dialog/review-add-dialog.component';
import { TeaAddDialogComponent } from './components/tea/tea-add-dialog/tea-add-dialog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

const MY_ROUTES = [
  { path: '', component: ShopListComponent },
  { path: 'detail/:id', component: ShopDetailComponent },
  { path: 'add', component: ShopAddComponent },
  { path: 'nearest', component: ShopFindNearestComponent },
];

@NgModule({
  declarations: [
    ShopListComponent,
    ShopAddComponent,
    ShopDetailComponent,
    ShopFindNearestComponent,
    TeaListComponent,
    TeaDetailComponent,
    TeaCreateReactiveComponent,
    TeaCardComponent,
    ReviewAddDialogComponent,
    TeaAddDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MY_ROUTES),
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    SharedModule,
    AngularEditorModule
  ],
  bootstrap: [ShopListComponent],
})
export class ShopModule { }
