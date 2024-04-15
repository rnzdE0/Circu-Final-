import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutPopComponent } from './logout-pop.component';

describe('LogoutPopComponent', () => {
  let component: LogoutPopComponent;
  let fixture: ComponentFixture<LogoutPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutPopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoutPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
