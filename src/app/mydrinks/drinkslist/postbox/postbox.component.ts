import { Component, OnInit, Input, Inject } from '@angular/core';

import { PostsService } from './posts.service';
import { Post, Drink } from '../../../types';
import { tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


class DialogData {
  drink: Drink
}


@Component({
  selector: 'app-postbox',
  templateUrl: './postbox.component.html',
  styleUrls: ['./postbox.component.scss']
})
export class PostboxComponent implements OnInit {

  // @Input()
  // drinkId: number;

  title: string = "";
  content: string = "";
  
  posts: Post[] = [];

  constructor(private postsService: PostsService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {

    this.fetchPosts();
  }


  fetchPosts() {
    this.postsService.getPosts(this.data.drink.id)
      .subscribe(ps => this.posts = ps);
  }

  postPost() {
    this.postsService.postPost(this.data.drink.id, this.title, this.content)
      // .pipe(tap(() => {this.title = ""; this.content = "";}))
      .subscribe(p => this.posts.unshift(p));

  }

  openDialog() {
    const dRef = this.dialog.open(PostDialogue, {width: "600px"});

    dRef.afterClosed().subscribe(res => {
      if (res) {
        this.postsService.postPost(this.data.drink.id, res.title, res.content)
        .subscribe(p => this.posts.push(p));
      }
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

