import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PciCalcComponent } from './pci-calc.component';

describe('PciCalcComponent', () => {
  let component: PciCalcComponent;
  let fixture: ComponentFixture<PciCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PciCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PciCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
