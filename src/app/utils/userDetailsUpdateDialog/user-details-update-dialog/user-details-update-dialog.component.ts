import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-signup',
  templateUrl: './user-details-update-dialog.component.html',
  styleUrls: ['./user-details-update-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UserDetailsUpdateDialogComponent {
  signupForm: FormGroup;
  showPassword = false;
  data: { userId: number } = inject(MAT_DIALOG_DATA);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserDetailsUpdateDialogComponent>
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      role: ['', [Validators.required]],
      isActive: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    console.log(this.data);
    this.userService.getUserById(this.data.userId).subscribe((user) => {
      this.signupForm.patchValue(user.data);
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      this.userService
        .updateUser(this.data.userId, this.signupForm.value)
        .subscribe(
          (response) => {
            console.log(response);
            if (response.status === 200) {
              this.dialogRef.close();
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
