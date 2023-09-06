import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFourteenComponent } from './equipment-fourteen.component';

describe('EquipmentFourteenComponent', () => {
  let component: EquipmentFourteenComponent;
  let fixture: ComponentFixture<EquipmentFourteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentFourteenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentFourteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
