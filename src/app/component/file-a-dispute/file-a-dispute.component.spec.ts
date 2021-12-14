import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileADisputeComponent } from './file-a-dispute.component';

describe('FileADisputeComponent', () => {
  let component: FileADisputeComponent;
  let fixture: ComponentFixture<FileADisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileADisputeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileADisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
