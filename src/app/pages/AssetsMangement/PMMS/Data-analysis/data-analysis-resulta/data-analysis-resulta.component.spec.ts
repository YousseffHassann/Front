import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalysisResultaComponent } from './data-analysis-resulta.component';

describe('DataAnalysisResultaComponent', () => {
  let component: DataAnalysisResultaComponent;
  let fixture: ComponentFixture<DataAnalysisResultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAnalysisResultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAnalysisResultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
