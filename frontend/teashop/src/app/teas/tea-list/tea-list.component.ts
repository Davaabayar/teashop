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

  teas: Tea[] = [];

  private teasSub: Subscription;

  constructor(private teasService: TeasService) { }

  ngOnInit() {
    console.log('Tea list onInit');
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
