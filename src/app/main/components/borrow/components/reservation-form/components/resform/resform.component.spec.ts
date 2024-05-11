import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResformComponent } from './resform.component';

describe('ResformComponent', () => {
  let component: ResformComponent;
  let fixture: ComponentFixture<ResformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
