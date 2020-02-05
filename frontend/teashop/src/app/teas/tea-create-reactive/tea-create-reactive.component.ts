import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { TeasService } from '../teas.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tea-create-reactive',
  templateUrl: './tea-create-reactive.component.html',
  styleUrls: ['./tea-create-reactive.component.css']
})
export class TeaCreateReactiveComponent implements OnInit {
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
    ])
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
  tagTypes = [];

  get flavors() {
    return this.teaForm.get('flavors') as FormArray;
  }

  constructor(private fb: FormBuilder, private teasService: TeasService) { }

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
    this.teasService.addTea(this.teaForm.value);
    console.log('OK');
  }

  ngOnInit() {
    this.tagTypes = this.teasService.getTags();
  }
}
