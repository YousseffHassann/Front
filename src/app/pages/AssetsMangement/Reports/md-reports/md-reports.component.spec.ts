import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDReportsComponent } from './md-reports.component';

describe('MDReportsComponent', () => {
  let component: MDReportsComponent;
  let fixture: ComponentFixture<MDReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MDReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MDReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
