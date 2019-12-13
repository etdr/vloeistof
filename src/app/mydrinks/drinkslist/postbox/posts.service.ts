import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../../auth/auth.service';
import { Post } from '../../../types';
import { APIURL } from '../../../../environments/environment.prod';

const BASEURL = APIURL+"/api/posts";

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getPosts(drinkId: number) {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.get<Post[]>(BASEURL+'/'+drinkId.toString(), httpOptions);


  }

  postPost(drinkId, title, content) {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.post<Post>(BASEURL+'/'+drinkId, {
      post: {
        title,
        content
      }
    }, httpOptions)
  }

  modifyPost(post: Post) {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.put<number[]>(BASEURL+"/"+post.id.toString(), {post}, httpOptions);
  }

  deletePost(postId: number) {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.delete<number[]>(BASEURL+"/"+postId.toString(), httpOptions);
  }
}
