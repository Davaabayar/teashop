import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialog, PageEvent } from '@angular/material';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Observable, Subscription } from 'rxjs';
import { of } from 'rxjs';
import { PostAddDialogComponent } from '../post-add-dialog/post-add-dialog.component';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  posts$: Observable<Post[]>;

  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private sharedService: SharedService
  ) {
  }

  ngOnInit() {
    this.subscription = this.postService.getPosts().subscribe(posts => {
      let json = JSON.parse(JSON.stringify(posts));
      this.sharedService.changePosts(json);
      this.sharedService.currentPosts.subscribe((res) => {
        this.posts$ = of(res);
      });
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(PostAddDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.subscription = this.postService.getPosts().subscribe(posts => {
        let json = JSON.parse(JSON.stringify(posts));
        this.sharedService.changePosts(json);
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
