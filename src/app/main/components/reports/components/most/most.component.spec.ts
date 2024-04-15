import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostComponent } from './most.component';

describe('MostComponent', () => {
  let component: MostComponent;
  let fixture: ComponentFixture<MostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
