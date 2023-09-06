import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconsistentSectionsComponent } from './inconsistent-sections.component';

describe('InconsistentSectionsComponent', () => {
  let component: InconsistentSectionsComponent;
  let fixture: ComponentFixture<InconsistentSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InconsistentSectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InconsistentSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
