import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaneSectionsErorrsComponent } from './lane-sections-erorrs.component';

describe('LaneSectionsErorrsComponent', () => {
  let component: LaneSectionsErorrsComponent;
  let fixture: ComponentFixture<LaneSectionsErorrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaneSectionsErorrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaneSectionsErorrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
