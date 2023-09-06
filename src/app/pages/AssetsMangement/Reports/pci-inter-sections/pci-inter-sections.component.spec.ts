import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCIInterSectionsComponent } from './pci-inter-sections.component';

describe('PCIInterSectionsComponent', () => {
  let component: PCIInterSectionsComponent;
  let fixture: ComponentFixture<PCIInterSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PCIInterSectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PCIInterSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
