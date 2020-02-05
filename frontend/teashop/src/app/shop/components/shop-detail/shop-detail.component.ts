import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { TeasService } from "../../../teas/teas.service";
import { ActivatedRoute } from "@angular/router";
import { ShopService } from "../../services/shop.service";
import { Observable } from "rxjs";
import { Shop } from "../../models/shop";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit, OnDestroy {
  shopDetailForm = this.fb.group({
    name: ['', Validators.required],
    contacts: this.fb.group({
      address: [''],
      phone: [''],
    }),
    location: this.fb.group({
      long: [''],
      lat: [''],
    }),
    tags: this.fb.array([
      this.fb.control('')
    ])
  });
  tagTypes;
  shopId;
  shop$: Observable<Shop>;
  readonly sub$;
  serverURL: string = environment.serverURL;

  constructor(private fb: FormBuilder,
    private teasService: TeasService,
    private shopService: ShopService,
    private router: ActivatedRoute) {
    this.sub$ = this.router.params.subscribe(params => {
      this.shopId = params.id;
    });
  }
  ngOnInit() {
    this.shopService.loadShop(this.shopId);
    this.shop$ = this.shopService.getShop(this.shopId);
  }

  onSubmit() {
    this.tagTypes = this.teasService.getTags();
  }

  addTag() {
    this.tags.push(this.fb.control(''));
  }

  get tags() {
    return this.shopDetailForm.get('tags') as FormArray;
  }

  ngOnDestroy(): void {
    if (this.sub$) this.sub$.unsubscribe();
  }
}
