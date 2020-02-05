import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {TeasService} from "../../../teas/teas.service";
import {ShopService} from "../../services/shop.service";
import {TokenService} from "../../../token.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html',
  styleUrls: ['./shop-add.component.css']
})
export class ShopAddComponent implements OnInit {

  private shopForm = this.fb.group({
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
  private tagTypes;

  constructor(private fb: FormBuilder,
              private shopService: ShopService,
              private teasService:TeasService,
              private tokenService:TokenService,
              private router:Router) {
  }

  ngOnInit() {
    this.tokenService.hasShop().subscribe(r=> {
      if(r["_id"]) this.router.navigateByUrl("shop/detail/"+r["_id"]);
    });
    this.tagTypes = this.teasService.getTags();
  }

  onSubmit() {
    this.shopService.addShop(this.shopForm.value);
  }
}
