import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRIOLANES2Component } from './prio-lanes2.component';

describe('PRIOLANES2Component', () => {
  let component: PRIOLANES2Component;
  let fixture: ComponentFixture<PRIOLANES2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PRIOLANES2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PRIOLANES2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
