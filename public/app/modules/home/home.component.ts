import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  template: '<app-home-table [data]="users" (userUpdated)="userUpdated($event)"></app-home-table>',
  providers: [ HomeService ]
})
export class HomeComponent implements OnInit {

  users: {};

  // Constructor
  constructor(
    private homeService: HomeService
  ) {}

  ngOnInit() {
          // Load users
          this.loadUsers();
  }

  loadUsers() {
        // Get all users
         this.homeService.getUsers()
                           .subscribe(
                               users => {
                                 this.users = users;
                                },
                                err => {
                                    // Log errors if any
                                    console.warn(err);
                                });
    }

    userUpdated(res: any) {
        if(res.success){
            this.loadUsers();
        }
    }
 }
