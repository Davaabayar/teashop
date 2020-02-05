import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { TeasService } from "../../../teas/teas.service";
import { ShopService } from "../../services/shop.service";
import { TokenService } from "../../../token.service";

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

  constructor(private fb: FormBuilder, private shopService: ShopService, private teasService: TeasService, private tokenService: TokenService) {
  }

  ngOnInit() {
    this.tokenService.hasShop();
    this.tagTypes = this.teasService.getTags();
  }

  onSubmit() {
    this.shopService.addShop(this.shopForm.value);
  }
}
