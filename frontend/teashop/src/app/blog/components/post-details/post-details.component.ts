import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Subscription, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  post$: Observable<Post>;
  subscription: Subscription;
  id: string;
  serverURL: string = environment.serverURL;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.subscription = route.params.subscribe((param: any) => {
      this.id = param['id'];
    });
  }

  ngOnInit() {
    this.post$ = this.postService.getOnePost(this.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
