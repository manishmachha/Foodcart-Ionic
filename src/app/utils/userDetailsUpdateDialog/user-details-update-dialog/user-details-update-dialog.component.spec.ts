import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsUpdateDialogComponent } from './user-details-update-dialog.component';

describe('UserDetailsUpdateDialogComponent', () => {
  let component: UserDetailsUpdateDialogComponent;
  let fixture: ComponentFixture<UserDetailsUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
