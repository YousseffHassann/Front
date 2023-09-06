import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentEightfilterComponent } from './equipment-eightfilter.component';

describe('EquipmentEightfilterComponent', () => {
  let component: EquipmentEightfilterComponent;
  let fixture: ComponentFixture<EquipmentEightfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentEightfilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentEightfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
