import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrdersSettlementComponent } from './work-orders-settlement.component';

describe('WorkOrdersSettlementComponent', () => {
  let component: WorkOrdersSettlementComponent;
  let fixture: ComponentFixture<WorkOrdersSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrdersSettlementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrdersSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
