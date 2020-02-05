import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Post } from '../../models/post';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PostAddDialogComponent } from '../post-add-dialog/post-add-dialog.component';
import { PostService } from '../../services/post.service';
import { environment } from '../../../../environments/environment';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  serverURL: string = environment.serverURL;
  subscription: Subscription;

  constructor(public datepipe: DatePipe,
    private dialog: MatDialog,
    private postService: PostService,
    private sharedService: SharedService) { }

  ngOnInit() {
  }

  createURLPost(id: string) {
    return 'posts/' + id;
  }

  edit() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = this.post;

    const dialogRef = this.dialog.open(PostAddDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.subscription = this.postService.getPosts().subscribe(posts => {
        let json = JSON.parse(JSON.stringify(posts));
        this.sharedService.changePosts(json);
      });
    });
  }


  delete(title: string, id: string) {
    if (confirm("Are you sure to delete " + title)) {
      this.postService.deletePost(id).subscribe(res => {
        console.log(res);
        this.subscription = this.postService.getPosts().subscribe(posts => {
          let json = JSON.parse(JSON.stringify(posts));
          this.sharedService.changePosts(json);
        });
      });
    }
  }
  ngOnDestroy() {
    if (this.subscription != undefined)
      this.subscription.unsubscribe();
  }

}
