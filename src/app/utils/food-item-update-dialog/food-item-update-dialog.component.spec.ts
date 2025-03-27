import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemUpdateDialogComponent } from './food-item-update-dialog.component';

describe('FoodItemUpdateDialogComponent', () => {
  let component: FoodItemUpdateDialogComponent;
  let fixture: ComponentFixture<FoodItemUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodItemUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodItemUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
