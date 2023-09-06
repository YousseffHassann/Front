import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentoneComponent } from './equipmentone.component';

describe('EquipmentoneComponent', () => {
  let component: EquipmentoneComponent;
  let fixture: ComponentFixture<EquipmentoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
