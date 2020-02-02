import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public http: HttpClient) { }

  getPosts(page) {
    return this.http.get('http://localhost:3000/blog/posts/' + page);
  }

}
