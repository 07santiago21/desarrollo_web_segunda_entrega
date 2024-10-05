import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFilteringComponent } from './owner-filtering.component';

describe('OwnerFilteringComponent', () => {
  let component: OwnerFilteringComponent;
  let fixture: ComponentFixture<OwnerFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerFilteringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
