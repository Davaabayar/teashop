import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Shop } from '../../../models/shop';
import { Subscription, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TeasService } from 'src/app/shop/services/teas.service';

@Component({
  selector: 'app-tea-add-dialog',
  templateUrl: './tea-add-dialog.component.html',
  styleUrls: ['./tea-add-dialog.component.css']
})
export class TeaAddDialogComponent implements OnInit, OnDestroy {
  teaForm = this.fb.group({
    teaName: ['', Validators.required],
    shortName: [''],
    cafine: [''],
    brewInstruction: this.fb.group({
      temp: [''],
      water: [''],
      time: [''],
      direction: []
    }),
    thumbnail: [''],
    description: [''],
    ingredients: [''],
    flavors: this.fb.array([
      this.fb.control('')
    ]),
    tags: this.fb.array([
      this.fb.control('')
    ]),
    shop: this.fb.group({
      id: [''],
      name: ['']
    })
  });

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    width: 'auto',
    minWidth: '0',
    maxHeight: '200px',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Description',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    uploadUrl: `${environment.serverURL}/api/upload`,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
    ]
  };

  shop: Shop;

  private subscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<TeaAddDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Observable<Shop>,
    private teasService: TeasService
  ) {
    this.subscription = data.subscribe((res) => {
      this.shop = res;
    });
  }

  tagTypes = [];

  get flavors() {
    return this.teaForm.get('flavors') as FormArray;
  }

  addFlavor() {
    this.flavors.push(this.fb.control(''));
  }

  get tags() {
    return this.teaForm.get('tags') as FormArray;
  }

  addTag() {
    this.tags.push(this.fb.control(''));
  }

  onSubmit() {
    this.teaForm.patchValue({
      shop: {
        id: this.shop._id,
        name: this.shop.name
      }
    });

    this.teasService.addTea(this.teaForm.value);
    this.closeDialog();
  }

  ngOnInit() {
    this.tagTypes = this.teasService.getTags();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

}