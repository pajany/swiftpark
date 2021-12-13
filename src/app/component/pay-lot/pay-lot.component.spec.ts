import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayLotComponent } from './pay-lot.component';

describe('PayLotComponent', () => {
  let component: PayLotComponent;
  let fixture: ComponentFixture<PayLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
