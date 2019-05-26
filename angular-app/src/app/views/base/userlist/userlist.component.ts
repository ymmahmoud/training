import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  users: any[];
  displayedUsers: any[];
  searchValue: string = "";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((usrs) => {
      this.users = usrs as any[];
      this.displayedUsers = this.users;
    });
  }

  search(e: any) {
    // Don't recompute if the search value hasn't changed i.e the user hit shift
    if (e.target.value != this.searchValue) {
      this.searchValue = e.target.value;
      this.displayedUsers = this.users.filter((usr) => {
        const name = usr.firstName + " " + usr.lastName;
        return name.includes(this.searchValue);
      });
    }
  }
}
