import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutProgress } from './checkout-progress';

describe('CheckoutProgress', () => {
  let component: CheckoutProgress;
  let fixture: ComponentFixture<CheckoutProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutProgress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
