import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() id: number;
  @Input() userId: number;
  @Input() title: string;
  @Input() content: string;
  username: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsername(this.userId)
      .subscribe(res => this.username = res.username);
    
  }

}
