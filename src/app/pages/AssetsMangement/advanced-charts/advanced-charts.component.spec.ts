import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedChartsComponent } from './advanced-charts.component';

describe('AdvancedChartsComponent', () => {
  let component: AdvancedChartsComponent;
  let fixture: ComponentFixture<AdvancedChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
