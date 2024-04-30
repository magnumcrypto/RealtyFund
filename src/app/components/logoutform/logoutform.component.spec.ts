import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutformComponent } from './logoutform.component';

describe('LogoutformComponent', () => {
  let component: LogoutformComponent;
  let fixture: ComponentFixture<LogoutformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoutformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
