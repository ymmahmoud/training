import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistmanagerComponent } from './checklistmanager.component';

describe('ChecklistmanagerComponent', () => {
  let component: ChecklistmanagerComponent;
  let fixture: ComponentFixture<ChecklistmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
