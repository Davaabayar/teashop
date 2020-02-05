import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {TeasService} from "../../../teas/teas.service";
import {ShopService} from "../../services/shop.service";

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
    }),
    location: this.fb.group({
      long: [''],
      lat: [''],
    }),
    thumbnail: [''],
    tags: this.fb.array([
      this.fb.control('')
    ])
  });
  private tagTypes;

  constructor(private fb: FormBuilder, private shopService: ShopService, private teasService:TeasService) {
  }

  get tags() {
    return this.shopForm.get('tags') as FormArray;
  }

  addTag() {
    this.tags.push(this.fb.control(''));
  }

  ngOnInit() {
    this.tagTypes = this.teasService.getTags();
  }

  onSubmit() {
    this.shopService.addShop(this.shopForm.value);
  }
}
