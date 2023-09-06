import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentLenthComponent } from './equipment-lenth.component';

describe('EquipmentLenthComponent', () => {
  let component: EquipmentLenthComponent;
  let fixture: ComponentFixture<EquipmentLenthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentLenthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentLenthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
