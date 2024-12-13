import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'gender', 'dob', 'age', 'actions'];
  dataSource: any[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response: any) => {
      this.dataSource = response.results.map((user: any) => ({
        firstName: user.name.first,
        lastName: user.name.last,
        gender: user.gender,
        dob: user.dob.date,
        age: user.dob.age,
        fullData: user,
      }));
    });
  }

  openDialog(user: any): void {
    this.dialog.open(UserDialogComponent, { data: user });
  }

  addToFavorites(user: any): void {
    this.userService.addToFavorites(user);
  }
}
