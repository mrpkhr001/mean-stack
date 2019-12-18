import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetSetupComponent } from './password-reset-setup.component';

describe('PasswordResetSetupComponent', () => {
  let component: PasswordResetSetupComponent;
  let fixture: ComponentFixture<PasswordResetSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
