import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  posts: Post[];
  private postsSource = new BehaviorSubject(this.posts);
  currentPosts = this.postsSource.asObservable();

  constructor() { }

  changePosts(posts: Post[]) {
    this.postsSource.next(posts);
  }

}
