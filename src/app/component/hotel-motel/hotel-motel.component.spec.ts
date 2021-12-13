import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelMotelComponent } from './hotel-motel.component';

describe('HotelMotelComponent', () => {
  let component: HotelMotelComponent;
  let fixture: ComponentFixture<HotelMotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelMotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelMotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
