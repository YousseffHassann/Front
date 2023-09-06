import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentValidateSKIDComponent } from './equipment-validate-skid.component';

describe('EquipmentValidateSKIDComponent', () => {
  let component: EquipmentValidateSKIDComponent;
  let fixture: ComponentFixture<EquipmentValidateSKIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentValidateSKIDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentValidateSKIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
