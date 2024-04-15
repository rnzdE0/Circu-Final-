import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowReserveComponent } from './borrow-reserve.component';

describe('BorrowReserveComponent', () => {
  let component: BorrowReserveComponent;
  let fixture: ComponentFixture<BorrowReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrowReserveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
