import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentEightComponent } from './equipment-eight.component';

describe('EquipmentEightComponent', () => {
  let component: EquipmentEightComponent;
  let fixture: ComponentFixture<EquipmentEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentEightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
