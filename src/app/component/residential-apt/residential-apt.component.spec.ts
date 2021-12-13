import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialAptComponent } from './residential-apt.component';

describe('ResidentialAptComponent', () => {
  let component: ResidentialAptComponent;
  let fixture: ComponentFixture<ResidentialAptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialAptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialAptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
