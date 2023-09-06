import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentValidateIRIComponent } from './equipment-validate-iri.component';

describe('EquipmentValidateIRIComponent', () => {
  let component: EquipmentValidateIRIComponent;
  let fixture: ComponentFixture<EquipmentValidateIRIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentValidateIRIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentValidateIRIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
