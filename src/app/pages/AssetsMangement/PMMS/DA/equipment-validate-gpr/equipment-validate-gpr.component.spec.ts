import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentValidateGPRComponent } from './equipment-validate-gpr.component';

describe('EquipmentValidateGPRComponent', () => {
  let component: EquipmentValidateGPRComponent;
  let fixture: ComponentFixture<EquipmentValidateGPRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentValidateGPRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentValidateGPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
