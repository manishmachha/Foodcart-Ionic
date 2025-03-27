import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewUser } from '../../models/NewUser';
import { UserDetailsUpdateDialogComponent } from '../../utils/userDetailsUpdateDialog/user-details-update-dialog/user-details-update-dialog.component';
import { ConfirmationDialogComponent } from '../../utils/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-users',

  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone: false,
})
export class UsersComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  selectedRole: string = '';
  sortBy: string = '';
  roles: string[] = ['ROLE_ADMIN', 'ROLE_USER']; // Define roles here
  showSearch = false;
  showFilter = false;
  showSort = false;
  userToEdit: NewUser;
  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.data;
      this.filteredUsers = this.users;
    });
  }

  editUser(id: number) {
    console.log(`Editing user with ID: ${id}`);

    this.dialog
      .open(UserDetailsUpdateDialogComponent, {
        width: '1000px',
        data: {
          userId: id,
        },
      })
      .afterClosed()
      .subscribe(() => this.ngOnInit());
  }

  deleteUser(id: number) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          title: 'Are you sure',
          content: `You Want to delete user #${id}?`,
          btn1: 'Yes',
          btn2: 'No',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.userService.deleteUser(id).subscribe((res) => {
            console.log(res.message);
            this.ngOnInit();
          });
        }
      });
  }

  updateUser(id: number) {
    const user = this.users.find((user) => user.id === id);
    console.log(user);
    if (user.isActive) {
      user.isActive = false;
    } else {
      user.isActive = true;
    }
    // console.log(user);
    this.userService.updateUser(id, user).subscribe((res) => {
      console.log(res.message);
      this.ngOnInit();
    });
  }

  addUser() {
    this.router.navigate(['/signup', { titleName: 'Add User' }]);
  }

  toggleOption(option: string) {
    if (option === 'search') {
      this.showSearch = !this.showSearch;
      this.showFilter = false;
      this.showSort = false;
    } else if (option === 'filter') {
      this.showFilter = !this.showFilter;
      this.showSearch = false;
      this.showSort = false;
    } else if (option === 'sort') {
      this.showSort = !this.showSort;
      this.showSearch = false;
      this.showFilter = false;
    }
  }

  applyFilters(): void {
    this.filteredUsers = this.users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.phoneNumber.includes(this.searchTerm) ||
          (user.role.toLowerCase().includes(this.searchTerm) &&
            (this.selectedRole ? user.role === this.selectedRole : true))
      )
      .sort((a, b) => a[this.sortBy].localeCompare(b[this.sortBy]));
  }

  doRefresh(event: any) {
    console.log('Refreshing...');

    // Simulate a data refresh
    setTimeout(() => {
      this.ngOnInit();

      // Stop the refresher spinner
      event.target.complete();
    }, 2000);
  }
}
