import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDashboarComponent } from './summary-dashboar.component';

describe('SummaryDashboarComponent', () => {
  let component: SummaryDashboarComponent;
  let fixture: ComponentFixture<SummaryDashboarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryDashboarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryDashboarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
