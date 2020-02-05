import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { TeasService } from '../../../services/teas.service';
import { Tea } from '../../../models/tea';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-tea-list',
  templateUrl: './tea-list.component.html',
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
