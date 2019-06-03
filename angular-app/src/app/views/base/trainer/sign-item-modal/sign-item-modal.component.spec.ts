import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignItemModalComponent } from './sign-item-modal.component';

describe('SignItemModalComponent', () => {
  let component: SignItemModalComponent;
  let fixture: ComponentFixture<SignItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
