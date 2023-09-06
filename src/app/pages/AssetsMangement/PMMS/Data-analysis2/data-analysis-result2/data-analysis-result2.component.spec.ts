import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalysisResult2Component } from './data-analysis-result2.component';

describe('DataAnalysisResult2Component', () => {
  let component: DataAnalysisResult2Component;
  let fixture: ComponentFixture<DataAnalysisResult2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAnalysisResult2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAnalysisResult2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
