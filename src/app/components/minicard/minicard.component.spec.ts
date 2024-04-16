import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinicardComponent } from './minicard.component';

describe('MinicardComponent', () => {
  let component: MinicardComponent;
  let fixture: ComponentFixture<MinicardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinicardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinicardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
