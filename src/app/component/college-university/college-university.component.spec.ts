import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeUniversityComponent } from './college-university.component';

describe('CollegeUniversityComponent', () => {
  let component: CollegeUniversityComponent;
  let fixture: ComponentFixture<CollegeUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeUniversityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
