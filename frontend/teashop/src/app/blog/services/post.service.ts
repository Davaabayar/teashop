import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient) { }

  getOnePost(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.serverURL}/api/blog/posts/one?id=` + id);
  }

  getPosts(page: number) {
    return this.http.get(`${environment.serverURL}/api/blog/posts/` + page);
  }


  savePost(post: Post) {
    return this.http.post(`${environment.serverURL}/api/blog/posts`, post);
  }

  updatePost(post: Post) {
    return this.http.put(`${environment.serverURL}/api/blog/posts`, post);
  }

  deletePost(id: string) {
    return this.http.delete(`${environment.serverURL}/api/blog/posts/` + id);
  }

}
