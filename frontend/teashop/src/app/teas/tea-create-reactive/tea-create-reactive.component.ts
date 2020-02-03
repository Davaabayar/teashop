import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-tea-create-reactive',
  templateUrl: './tea-create-reactive.component.html',
  styleUrls: ['./tea-create-reactive.component.css']
})
export class TeaCreateReactiveComponent{
  teaForm = this.fb.group({
    teaName: ['', Validators.required],
    shortName: [''],
    cafine:[''],
    brewInstruction: this.fb.group({
      temp:[''],
      water:[''],
      minute:[''],
      direction:[]
    }),
    description:[''],
    ingredients:[''],
    flavors:this.fb.array([
      this.fb.control('')
    ])
  });

  get flavors(){
    return this.teaForm.get('flavors') as FormArray;
  }
  constructor(private fb:FormBuilder) { }

  addFlavor() {
    this.flavors.push(this.fb.control(''));
  }

  onSubmit(){
    console.warn(this.teaForm.value);
  }

}
