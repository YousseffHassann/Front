import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmenTwoFilterComponent } from './equipmen-two-filter.component';

describe('EquipmenTwoFilterComponent', () => {
  let component: EquipmenTwoFilterComponent;
  let fixture: ComponentFixture<EquipmenTwoFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmenTwoFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmenTwoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
