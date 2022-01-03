import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessdisputeComponent } from './successdispute.component';

describe('SuccessdisputeComponent', () => {
  let component: SuccessdisputeComponent;
  let fixture: ComponentFixture<SuccessdisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessdisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessdisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
