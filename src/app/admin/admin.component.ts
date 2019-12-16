import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AdminService } from './admin.service';
import { User } from '../types';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: User[] = [];

  constructor(private adminService: AdminService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers()
      .subscribe(us => this.users = us);
  }

  deleteUser(uId) {
    const dRef = this.dialog.open(ConfirmUserDelete, {
      width: "600px"
    });

    dRef.afterClosed().subscribe(res => {

      if (res) {
        this.adminService.deleteUser(uId)
          .subscribe(r => console.log(r));

        this.users = this.users.filter(u => u.id !== uId)
      }
    })
  }

  deleteUserPlus(uId) {
    const dRef = this.dialog.open(ConfirmUserDelete, {
      width: "600px"
    });

    dRef.afterClosed().subscribe(res => {

      if (res) {
        this.adminService.deleteUserPlus(uId)
          .subscribe(r => console.log(r));

        this.users = this.users.filter(u => u.id !== uId)
      }
    })
  }


}

@Component({
  selector: 'app-confirm-user-delete',
  templateUrl: './confirm-user-delete.html',
  styleUrls: ['./admin.component.scss']
})
export class ConfirmUserDelete {

  constructor(public dRef: MatDialogRef<ConfirmUserDelete>) { }

  onNoClick() {
    this.dRef.close()
  }


}