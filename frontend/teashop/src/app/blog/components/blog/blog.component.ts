import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
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

  constructor(
    private postService: PostService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.subscription = this.postService.getPosts(1).subscribe(posts => {
      this.posts$ = of(JSON.parse(JSON.stringify(posts)));
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
