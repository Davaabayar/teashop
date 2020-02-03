import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient) { }

  getPosts(page: number) {
    return this.http.get('http://localhost:3000/api/blog/posts/' + page);
  }


  savePost(post: Post) {
    return this.http.post('http://localhost:3000/api/blog/posts', post);
  }

  updatePost(post: Post) {
    return this.http.put('http://localhost:3000/api/blog/posts', post);
  }

  deletePost(id: string) {
    return this.http.delete('http://localhost:3000/api/blog/posts/' + id);
  }

}
