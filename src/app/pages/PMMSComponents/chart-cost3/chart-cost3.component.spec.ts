import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCost3Component } from './chart-cost3.component';

describe('ChartCost3Component', () => {
  let component: ChartCost3Component;
  let fixture: ComponentFixture<ChartCost3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCost3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCost3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
