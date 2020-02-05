import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { TeasService } from "../../services/teas.service";
import { ShopService } from "../../services/shop.service";
import { TokenService } from "../../../token.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html',
  styleUrls: ['./shop-add.component.css']
})
export class ShopAddComponent implements OnInit {

  shopForm = this.fb.group({
    name: ['', Validators.required],
    contacts: this.fb.group({
      address: [''],
      phone: [''],
      website: ['']
    }),
    workHours: this.fb.group({
      open: [''],
      close: [''],
    }),
    workDays: [''],
    location: this.fb.group({
      long: [''],
      lat: [''],
    }),
    thumbnail: [''],
    tags: ['']
  });
  tagTypes;

  constructor(private fb: FormBuilder,
    private shopService: ShopService,
    private teasService: TeasService,
    private tokenService: TokenService,
    private router: Router) {
  }

  ngOnInit() {
    this.tokenService.hasShop().subscribe(r => {
      if (r && r["_id"]) this.router.navigateByUrl("shop/detail/" + r["_id"]);
    });
    this.tagTypes = this.teasService.getTags();
  }

  onSubmit() {
    this.shopService.addShop(this.shopForm.value);
  }
}
