import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentValidateFWDComponent } from './equipment-validate-fwd.component';

describe('EquipmentValidateFWDComponent', () => {
  let component: EquipmentValidateFWDComponent;
  let fixture: ComponentFixture<EquipmentValidateFWDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentValidateFWDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentValidateFWDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
