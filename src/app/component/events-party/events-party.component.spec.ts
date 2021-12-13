import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsPartyComponent } from './events-party.component';

describe('EventsPartyComponent', () => {
  let component: EventsPartyComponent;
  let fixture: ComponentFixture<EventsPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsPartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
