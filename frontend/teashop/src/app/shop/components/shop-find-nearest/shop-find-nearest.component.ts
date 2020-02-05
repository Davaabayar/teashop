import { Component, OnInit } from '@angular/core';
import { ShopService } from "../../services/shop.service";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { Shop } from "../../models/shop";

@Component({
  selector: 'app-shop-find-nearest',
  templateUrl: './shop-find-nearest.component.html',
  styleUrls: ['./shop-find-nearest.component.css']
})
export class ShopFindNearestComponent implements OnInit {
  serverURL: string = environment.serverURL;
  shops$: Observable<Shop[]>;

  constructor(private shopService: ShopService) {
  }

  ngOnInit() {
    this.shopService.loadNearestShops(5, 50000000).then(r => this.shops$ = r);
  }

}
