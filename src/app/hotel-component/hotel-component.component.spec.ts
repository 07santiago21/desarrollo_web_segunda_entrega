import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelComponentComponent } from './hotel-component.component';

describe('HotelComponentComponent', () => {
  let component: HotelComponentComponent;
  let fixture: ComponentFixture<HotelComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
