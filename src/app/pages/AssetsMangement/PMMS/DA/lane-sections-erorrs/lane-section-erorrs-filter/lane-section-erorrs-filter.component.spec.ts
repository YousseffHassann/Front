import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaneSectionErorrsFilterComponent } from './lane-section-erorrs-filter.component';

describe('LaneSectionErorrsFilterComponent', () => {
  let component: LaneSectionErorrsFilterComponent;
  let fixture: ComponentFixture<LaneSectionErorrsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaneSectionErorrsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaneSectionErorrsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
