import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PciIntersectionsComponent } from './pci-intersections.component';

describe('PciIntersectionsComponent', () => {
  let component: PciIntersectionsComponent;
  let fixture: ComponentFixture<PciIntersectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PciIntersectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PciIntersectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
