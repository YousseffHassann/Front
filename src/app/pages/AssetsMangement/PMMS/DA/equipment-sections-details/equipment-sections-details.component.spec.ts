import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSectionsDetailsComponent } from './equipment-sections-details.component';

describe('EquipmentSectionsDetailsComponent', () => {
  let component: EquipmentSectionsDetailsComponent;
  let fixture: ComponentFixture<EquipmentSectionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentSectionsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSectionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
