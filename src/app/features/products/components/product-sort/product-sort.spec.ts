import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSort } from './product-sort';

describe('ProductSort', () => {
  let component: ProductSort;
  let fixture: ComponentFixture<ProductSort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSort]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSort);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
