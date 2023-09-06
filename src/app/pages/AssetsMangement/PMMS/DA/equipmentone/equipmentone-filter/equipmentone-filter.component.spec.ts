import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentoneFilterComponent } from './equipmentone-filter.component';

describe('EquipmentoneFilterComponent', () => {
  let component: EquipmentoneFilterComponent;
  let fixture: ComponentFixture<EquipmentoneFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentoneFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentoneFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
