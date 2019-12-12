import { Component, OnInit, Input } from '@angular/core';

import { PostsService } from './posts.service';
import { Post } from '../../../types';
import { tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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

  constructor(private postsService: PostsService, public dialog: MatDialog) { }

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

  openDialog(drinkId) {
    const dRef = this.dialog.open(PostDialogue, {width: "600px"});

    dRef.afterClosed().subscribe(res => {
      this.postsService.postPost(drinkId, res.title, res.content)
        .subscribe(p => this.posts.push(p));
    });
  }
}



@Component ({
  selector: 'app-postDialogue',
  templateUrl: './postDialogue.component.html',
  styleUrls: ['./postbox.component.scss']
})
export class PostDialogue{
  title: string;
  content: string;

  constructor(public dRef: MatDialogRef<PostDialogue>) {

  }

  onNoClick() {
    this.dRef.close()
  }

}

