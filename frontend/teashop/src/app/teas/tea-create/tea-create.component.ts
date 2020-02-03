import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TeasService } from '../teas.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Tea } from '../tea.model';

@Component({
  selector: 'app-tea-create',
  templateUrl: './tea-create.component.html',
  styleUrls: ['./tea-create.component.css']
})

export class TeaCreateComponent implements OnInit{
  enteredName = "";
  enteredShortName = "";
  categories = [];
  private mode = 'create';
  private teaId:string;
  tea:Tea;

  constructor(private teasService:TeasService, public route:ActivatedRoute) { }
 
  ngOnInit(){
    this.categories = this.teasService.getCategories();  
    
    //check if id is provided in the route
    //component uurchlugduugui bhad zam uurchlugduh tul subscribe hiih yostoi.
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      // parameter uurchlugduhud
      if(paramMap.has('teaId')){
        this.mode = 'edit';
        this.teaId = paramMap.get('teaId');
        this.tea = this.teasService.getTea(this.teaId);
      }else{
        this.mode = 'create';
        this.teaId = null;
      }
    });
    console.log(this.tea);
  }

  onSaveTea(form:NgForm){
    if(form.invalid){
      return;
    }
    //this.tea = new Tea({...form.value});
    if(this.mode === 'create'){
      this.teasService.addTea(this.tea);
      form.resetForm();
    }else{
      this.teasService.updateTea(this.tea);
    }
  }
}
