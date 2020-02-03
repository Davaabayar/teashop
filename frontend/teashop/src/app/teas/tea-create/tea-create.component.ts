import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TeasService } from '../teas.service';

@Component({
  selector: 'app-tea-create',
  templateUrl: './tea-create.component.html',
  styleUrls: ['./tea-create.component.css']
})

export class TeaCreateComponent implements OnInit{
  enteredName = "";
  enteredShortName = "";
  categories = [];

  constructor(private teasService:TeasService) { }
 
  ngOnInit(){
    this.categories = this.teasService.getCategories();  
  }

  onAddTea(form:NgForm){
    if(form.invalid){
      return;
    }
    // console.log(form.value);
    // this.teasService.addTea(form.value.name, form.value.short);
    form.resetForm();
  }
}
