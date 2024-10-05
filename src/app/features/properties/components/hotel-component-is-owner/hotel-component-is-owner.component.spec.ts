import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelComponentIsOwnerComponent } from './hotel-component-is-owner.component';

describe('HotelComponentIsOwnerComponent', () => {
  let component: HotelComponentIsOwnerComponent;
  let fixture: ComponentFixture<HotelComponentIsOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelComponentIsOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelComponentIsOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
