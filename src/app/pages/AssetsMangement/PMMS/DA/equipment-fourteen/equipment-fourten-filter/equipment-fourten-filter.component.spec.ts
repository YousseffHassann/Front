import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentFourtenFilterComponent } from './equipment-fourten-filter.component';

describe('EquipmentFourtenFilterComponent', () => {
  let component: EquipmentFourtenFilterComponent;
  let fixture: ComponentFixture<EquipmentFourtenFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentFourtenFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentFourtenFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
