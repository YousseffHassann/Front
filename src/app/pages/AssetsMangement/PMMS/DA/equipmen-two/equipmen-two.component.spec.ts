import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmenTwoComponent } from './equipmen-two.component';

describe('EquipmenTwoComponent', () => {
  let component: EquipmenTwoComponent;
  let fixture: ComponentFixture<EquipmenTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmenTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmenTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
