import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  constructor(public datepipe: DatePipe) { }

  ngOnInit() {
  }

  createURLPost(id: number) {
    return 'posts/' + id;
  }

}
