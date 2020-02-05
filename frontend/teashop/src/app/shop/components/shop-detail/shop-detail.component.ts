import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { TeasService } from "../../services/teas.service";
import { ActivatedRoute } from "@angular/router";
import { ShopService } from "../../services/shop.service";
import { Observable, Subscription } from "rxjs";
import { Shop } from "../../models/shop";
import { environment } from "../../../../environments/environment";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TeaAddDialogComponent } from '../tea/tea-add-dialog/tea-add-dialog.component';
import {Tea} from "../../models/tea";

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
  tagTypes: string[];
  shopId: string;
  shop$: Observable<Shop>;
  tea$: Observable<Tea[]>;
  readonly sub$: Subscription;
  serverURL: string = environment.serverURL;

  constructor(private fb: FormBuilder,
    private teasService: TeasService,
    private shopService: ShopService,
    private dialog: MatDialog,
    private router: ActivatedRoute) {
    this.sub$ = this.router.params.subscribe(params => {
      this.shopId = params.id;
    });
  }

  ngOnInit() {
    this.shopService.loadShop(this.shopId);
    this.shop$ = this.shopService.getShop(this.shopId);

    this.teasService.loadTeaByShop(this.shopId);
    this.tea$ = this.teasService.getTeasByShop(this.shopId);
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

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = this.shop$;

    const dialogRef = this.dialog.open(TeaAddDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.teasService.loadTeaByShop(this.shopId);
      this.tea$ = this.teasService.getTeasByShop(this.shopId);
      console.log('add tea dialog closed');
    });
  }

  ngOnDestroy(): void {
    if (this.sub$) this.sub$.unsubscribe();
  }
}
