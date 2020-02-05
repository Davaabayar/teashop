import { Component, OnInit } from '@angular/core';
import { ShopService } from "../../services/shop.service";
import { Shop } from "../../models/shop";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {
  serverURL: string = environment.serverURL;

  constructor(private shopService: ShopService) {
  }

  shops$: Observable<Shop[]>;

  ngOnInit() {
    this.shopService.loadShops();
    this.shops$ = this.shopService.shops;
  }

}
