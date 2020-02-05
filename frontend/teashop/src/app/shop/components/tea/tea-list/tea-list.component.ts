import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { TeasService } from '../../../services/teas.service';
import { Tea } from '../../../models/tea';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-tea-list',
  templateUrl: './tea-list.component.html',
  styleUrls: ['./tea-list.component.css']
})
export class TeaListComponent implements OnInit {

  teas: Tea[];
  teas$: Observable<Tea[]>;
  serverURL: string = environment.serverURL;
  color = 'primary';
  mode = 'determinate';
  value = 50;
  average = 0;

  private teasSub: Subscription;

  constructor(private teasService: TeasService) { }

  ngOnInit() {
    this.teasService.loadTeas();
    this.teas$ = this.teasService.getTeas();
  }

  getAvgReview(reviews) {

    if (reviews) {
      let total = 0;
      reviews.forEach(r => {
        total += r["star"];
      });
      this.average = total / reviews.length;
      console.log('Reviews', reviews, 'avegrage ', this.average);
      return total / reviews.length;
    } else return 0;
  }

  onDelete(id: string) {
    if (id != null)
      this.teasService.deleteTea(id);
  }
}
