import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReview } from './order-review';

describe('OrderReview', () => {
  let component: OrderReview;
  let fixture: ComponentFixture<OrderReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
