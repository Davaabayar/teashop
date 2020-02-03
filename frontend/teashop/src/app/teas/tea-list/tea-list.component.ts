import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { TeasService } from '../teas.service';
import { Tea } from '../tea.model';

@Component({
  selector: 'app-tea-list',
  templateUrl: './tea-list.component.html',
  styleUrls: ['./tea-list.component.css']
})
export class TeaListComponent implements OnInit, OnDestroy {

  teas:Tea[] = [];
  
  private teasSub: Subscription;

  constructor(private teasService: TeasService) { }

  ngOnInit() {
    this.teas = this.teasService.getTeas();   
    this.teasSub = this.teasService.getTeasUpdateListener()
      .subscribe((teas:Tea[]) => {
        this.teas = teas;      
      });
  }

  ngOnDestroy() {
    this.teasSub.unsubscribe();
  }
  onDelete(id:string){
    if(id!=null)
      this.teasService.deleteTea(id);
  }
}
