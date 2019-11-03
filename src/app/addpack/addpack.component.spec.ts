import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpackComponent } from './addpack.component';

describe('AddpackComponent', () => {
  let component: AddpackComponent;
  let fixture: ComponentFixture<AddpackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
