import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChecklistViewComponent } from './user-checklist-view.component';

describe('UserChecklistViewComponent', () => {
  let component: UserChecklistViewComponent;
  let fixture: ComponentFixture<UserChecklistViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChecklistViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChecklistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
