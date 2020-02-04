import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { TeasService } from '../teas.service';
import { Tea } from '../tea.model';
import { environment } from '../../../environments/environment';
import { TeaCardComponent } from './tea-card.component';


@Component({
  selector: 'app-tea-list',
  templateUrl: './tea-list.component.html',
  // template: `
  //   <h1>Teas by: this shop</h1>  
  //   <app-tea-card [data]="teas"></app-tea-card> 
  // `,
  styleUrls: ['./tea-list.component.css']
})
export class TeaListComponent implements OnInit, OnDestroy {

  teas: Tea[];
  serverURL: string = environment.serverURL;
  color = 'primary';
  mode = 'determinate';
  value = 50;


  private teasSub: Subscription;

  constructor(private teasService: TeasService) { }

  ngOnInit() {
    this.teasSub = this.teasService.getTeas().subscribe(teas => {
      this.teas = JSON.parse(JSON.stringify(teas));
    });
  }

  ngOnDestroy() {
    this.teasSub.unsubscribe();
  }
  onDelete(id: string) {
    if (id != null)
      this.teasService.deleteTea(id);
  }
}
