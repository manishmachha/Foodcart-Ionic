import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../utils/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone:false
})
export class SignupComponent {
  title: string;
  signupForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    });
  }

  ngOnInit(): void {
    // Get path variable and set title dynamically
    this.route.paramMap.subscribe((params) => {
      const titleName = params.get('titleName'); // Get 'role' from URL
      console.log(titleName);

      this.title = titleName ? ` ${titleName}` : 'Signup'; // Set dynamic title
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      this.userService.signup(this.signupForm.value).subscribe(
        (response) => {
          if (response.status === 201) {
            this.dialog
              .open(ConfirmationDialogComponent, {
                data: {
                  title: 'User Created',
                  content: 'Signed up successfully. Login ?',
                  btn1: 'Yes',
                  btn2: 'No',
                },
              })
              .afterClosed()
              .subscribe((res) => {
                if (res) {
                  this.router.navigate(['/login']);
                }
              });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
