import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitsComponent } from './exits.component';

describe('ExitsComponent', () => {
  let component: ExitsComponent;
  let fixture: ComponentFixture<ExitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
