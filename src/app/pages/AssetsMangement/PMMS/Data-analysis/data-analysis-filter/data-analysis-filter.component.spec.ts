import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalysisFilterComponent } from './data-analysis-filter.component';

describe('DataAnalysisFilterComponent', () => {
  let component: DataAnalysisFilterComponent;
  let fixture: ComponentFixture<DataAnalysisFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAnalysisFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAnalysisFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
