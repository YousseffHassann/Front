import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chtest2Component } from './chtest2.component';

describe('Chtest2Component', () => {
  let component: Chtest2Component;
  let fixture: ComponentFixture<Chtest2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chtest2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chtest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
