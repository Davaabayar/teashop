import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Post } from '../../models/post';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PostAddDialogComponent } from '../post-add-dialog/post-add-dialog.component';
import { PostService } from '../../services/post.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  serverURL: string = environment.serverURL;

  constructor(public datepipe: DatePipe,
    private dialog: MatDialog,
    private postService: PostService) { }

  ngOnInit() {
  }

  createURLPost(id: number) {
    return 'posts/' + id;
  }

  edit() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = this.post;

    this.dialog.open(PostAddDialogComponent, dialogConfig);
  }


  delete(title: string, id: string) {
    if (confirm("Are you sure to delete " + title)) {
      this.postService.deletePost(id).subscribe(res => {
        console.log(res);
      });
    }
  }

}
