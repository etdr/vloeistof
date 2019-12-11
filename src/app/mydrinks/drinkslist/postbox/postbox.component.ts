import { Component, OnInit, Input } from '@angular/core';

import { PostsService } from './posts.service';
import { Post } from '../../../types';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-postbox',
  templateUrl: './postbox.component.html',
  styleUrls: ['./postbox.component.scss']
})
export class PostboxComponent implements OnInit {

  @Input()
  drinkId: number;

  title: string = "";
  content: string = "";
  
  posts: Post[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit() {

    this.fetchPosts();
  }


  fetchPosts() {
    this.postsService.getPosts(this.drinkId)
      .subscribe(ps => this.posts = ps);
  }

  postPost() {
    this.postsService.postPost(this.drinkId, this.title, this.content)
      .pipe(tap(() => {this.title = ""; this.content = "";}))
      .subscribe(p => this.posts.push(p));

  }
}
