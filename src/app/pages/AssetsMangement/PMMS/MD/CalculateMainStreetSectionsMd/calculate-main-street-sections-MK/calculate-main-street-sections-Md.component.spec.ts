import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateMainStreetSectionsMdComponent } from './calculate-main-street-sections-Md.component';

describe('CalculateMainStreetSectionsMdComponent', () => {
  let component: CalculateMainStreetSectionsMdComponent;
  let fixture: ComponentFixture<CalculateMainStreetSectionsMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateMainStreetSectionsMdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateMainStreetSectionsMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
