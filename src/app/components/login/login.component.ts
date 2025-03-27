import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../utils/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.authService.setAuthToken(response.data.token);
          if (response.data.role === 'ROLE_ADMIN') {
            this.dialog
              .open(ConfirmationDialogComponent, {
                data: {
                  title: 'Admin Detected',
                  content: 'Want to login as admin or user?',
                  btn1: 'User',
                  btn2: 'Admin',
                },
              })
              .afterClosed()
              .subscribe((result: boolean) => {
                if (result) {
                  this.router.navigate(['/signup']);
                } else {
                  this.router.navigate(['/admin']);
                }
              });
          }
          // this.router.navigate(['/dashboard']); // Redirect after login
        },
        error: (err) => {
          console.error('Login failed:', err.error.message);
          this.errorMessage = err.error.message;
        },
      });
    }
  }
}
