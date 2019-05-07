import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatechecklistComponent } from './createchecklist.component';

describe('CreatechecklistComponent', () => {
  let component: CreatechecklistComponent;
  let fixture: ComponentFixture<CreatechecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatechecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatechecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
