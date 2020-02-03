import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Observable, Subscription } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  posts$: Observable<Post[]>;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.subscription = this.postService.getPosts(1).subscribe(posts => {
      this.posts$ = of(JSON.parse(JSON.stringify(posts)));
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
