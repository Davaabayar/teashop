import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeasService } from '../teas.service';
import { Tea } from '../tea.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ReviewAddDialogComponent } from '../review-add-dialog/review-add-dialog.component';


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

  star: number;
  comment: string;


  constructor(private teasService: TeasService,
    private router: ActivatedRoute,
    private dialog: MatDialog) {
    this.subscription = this.router.params.subscribe(params => {
      this.teaId = params.teaId;
    });
  }

  ngOnInit() {
    this.tea$ = this.teasService.getTea(this.teaId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewAddDialogComponent, {
      width: '500px',
      data: { star: this.star, commet: this.comment }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}


