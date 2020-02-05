import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeasService} from '../../../services/teas.service';
import {Tea} from '../../../models/tea';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {environment} from 'src/environments/environment';
import {MatDialog} from '@angular/material';
import {ReviewAddDialogComponent} from '../../review-add-dialog/review-add-dialog.component';


@Component({
  selector: 'app-tea-detail',
  templateUrl: './tea-detail.component.html',
  styleUrls: ['./tea-detail.component.css']
})
export class TeaDetailComponent implements OnInit, OnDestroy {

  tea$: Observable<Tea>;
  subscription: Subscription;
  teaId: string;
  serverURL: string = environment.serverURL;
  average = 0;

  constructor(private teasService: TeasService,
              private router: ActivatedRoute,
              private dialog: MatDialog) {
    this.subscription = this.router.params.subscribe(params => {
      this.teaId = params.teaId;
    });
  }

  getAvgReview(reviews) {
    if (reviews) {
      let total = 0;
      reviews.forEach(r => {
        total += r["star"];
      });
      this.average = total / reviews.length;
      return total / reviews.length;
    } else return 0;
  }

  ngOnInit() {
    this.teasService.loadTea(this.teaId);
    this.tea$ = this.teasService.getTea(this.teaId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewAddDialogComponent, {
      width: '500px',
      data: {teaId: this.teaId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.teasService.loadTea(this.teaId);
      this.tea$ = this.teasService.getTea(this.teaId);
      console.log('The dialog was closed', result);
    });
  }
}


