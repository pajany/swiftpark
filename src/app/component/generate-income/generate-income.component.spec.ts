import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateIncomeComponent } from './generate-income.component';

describe('GenerateIncomeComponent', () => {
  let component: GenerateIncomeComponent;
  let fixture: ComponentFixture<GenerateIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
