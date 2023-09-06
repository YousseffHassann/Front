import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncalculatedSectionsComponent } from './uncalculated-sections.component';

describe('UncalculatedSectionsComponent', () => {
  let component: UncalculatedSectionsComponent;
  let fixture: ComponentFixture<UncalculatedSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UncalculatedSectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UncalculatedSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
