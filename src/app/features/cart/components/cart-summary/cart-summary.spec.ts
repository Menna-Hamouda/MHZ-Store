import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSummary } from './cart-summary';

describe('CartSummary', () => {
  let component: CartSummary;
  let fixture: ComponentFixture<CartSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
