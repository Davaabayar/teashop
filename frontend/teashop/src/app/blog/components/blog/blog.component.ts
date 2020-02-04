import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialog, PageEvent } from '@angular/material';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Observable, Subscription } from 'rxjs';
import { of } from 'rxjs';
import { PostAddDialogComponent } from '../post-add-dialog/post-add-dialog.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  posts$: Observable<Post[]>;

  pageEvent: PageEvent;

  length: number;
  pageSize = 3;

  constructor(
    private postService: PostService,
    private dialog: MatDialog
  ) {
    this.subscription = this.postService.getPostCount().subscribe(res => {
      this.length = res['count'];
    });
  }

  ngOnInit() {
    this.subscription = this.postService.getPosts(1).subscribe(posts => {
      let json = JSON.parse(JSON.stringify(posts));
      this.posts$ = of(json);
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    this.dialog.open(PostAddDialogComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
