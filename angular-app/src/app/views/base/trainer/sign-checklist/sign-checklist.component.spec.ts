import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignChecklistComponent } from './sign-checklist.component';

describe('SignChecklistComponent', () => {
  let component: SignChecklistComponent;
  let fixture: ComponentFixture<SignChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
