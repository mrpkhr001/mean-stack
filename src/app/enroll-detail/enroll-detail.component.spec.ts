import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollDetailComponent } from './enroll-detail.component';

describe('EnrollDetailComponent', () => {
  let component: EnrollDetailComponent;
  let fixture: ComponentFixture<EnrollDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
