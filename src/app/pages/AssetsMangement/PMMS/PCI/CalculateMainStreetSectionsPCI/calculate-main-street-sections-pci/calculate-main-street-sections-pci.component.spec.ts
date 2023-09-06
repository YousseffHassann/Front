import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateMainStreetSectionsPCIComponent } from './calculate-main-street-sections-pci.component';

describe('CalculateMainStreetSectionsPCIComponent', () => {
  let component: CalculateMainStreetSectionsPCIComponent;
  let fixture: ComponentFixture<CalculateMainStreetSectionsPCIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateMainStreetSectionsPCIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateMainStreetSectionsPCIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
