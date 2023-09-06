import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalysisFilter2Component } from './data-analysis-filter2.component';

describe('DataAnalysisFilterComponent', () => {
  let component: DataAnalysisFilter2Component;
  let fixture: ComponentFixture<DataAnalysisFilter2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAnalysisFilter2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAnalysisFilter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
