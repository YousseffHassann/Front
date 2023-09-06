import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalysis2Component } from './data-analysis2.component';

describe('DataAnalysisComponent', () => {
  let component: DataAnalysis2Component;
  let fixture: ComponentFixture<DataAnalysis2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAnalysis2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAnalysis2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
