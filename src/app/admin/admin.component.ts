import { Component, OnInit } from '@angular/core';

import { AdminService } from './admin.service';
import { User } from '../types';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: User[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers()
      .subscribe(us => this.users = us);
  }

  deleteUser(uId) {
    this.adminService.deleteUser(uId)
      .subscribe(r => console.log(r));
  }
}
