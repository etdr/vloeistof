import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginToggle: boolean = false;

  username: string = "";
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.token) {
      this.router.navigateByUrl('/drinks/my');
    }
  }

  submit () {
    if (!this.loginToggle) this.authService.signup(this.username, this.email, this.password).subscribe(res => console.log(res));
    else this.authService.signin(this.username, this.password).subscribe(res => console.log(res));
  }
  
}
