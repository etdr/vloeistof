import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../../auth/auth.service';
import { Post } from '../../../types';
import { APIURL } from '../../../../environments/environment.prod';

const BASEURL = APIURL+"/api/posts";


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getPosts(drinkId: number) {
    return this.http.get<Post[]>(BASEURL+'/'+drinkId.toString());


  }

  postPost(drinkId, title, content) {
    return this.http.post<Post>(BASEURL+'/'+drinkId, {
      post: {
        title,
        content
      }
    });
  }

  modifyPost(post: Post) {
    return this.http.put<number[]>(BASEURL+"/"+post.id.toString(), {post});
  }

  deletePost(postId: number) {
    return this.http.delete<number[]>(BASEURL+"/"+postId.toString());
  }
}
