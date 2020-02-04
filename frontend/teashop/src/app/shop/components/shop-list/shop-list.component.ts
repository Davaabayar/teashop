import { Component, OnInit } from '@angular/core';
import {ShopService} from "../../services/shop.service";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  constructor(private shopService:ShopService) { }

  private shopList;

  ngOnInit() {
    this.shopList = this.shopService.getShops();
  }

}
