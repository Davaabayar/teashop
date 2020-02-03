import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopListComponent } from './shop-list/shop-list.component';
import { ShopAddComponent } from './shop-add/shop-add.component';



@NgModule({
  declarations: [ShopListComponent, ShopAddComponent],
  imports: [
    CommonModule
  ]
})
export class ShopModule { }
