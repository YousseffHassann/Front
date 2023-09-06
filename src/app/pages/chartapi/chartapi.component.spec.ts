import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartapiComponent } from './chartapi.component';

describe('ChartapiComponent', () => {
  let component: ChartapiComponent;
  let fixture: ComponentFixture<ChartapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartapiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
