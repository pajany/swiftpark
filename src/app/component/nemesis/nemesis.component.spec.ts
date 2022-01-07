import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NemesisComponent } from './nemesis.component';

describe('NemesisComponent', () => {
  let component: NemesisComponent;
  let fixture: ComponentFixture<NemesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NemesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NemesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
