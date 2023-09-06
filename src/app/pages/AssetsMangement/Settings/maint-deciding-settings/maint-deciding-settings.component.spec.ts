import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAINTDECIDINGSettingsComponent } from './maint-deciding-settings.component';

describe('MAINTDECIDINGSettingsComponent', () => {
  let component: MAINTDECIDINGSettingsComponent;
  let fixture: ComponentFixture<MAINTDECIDINGSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MAINTDECIDINGSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MAINTDECIDINGSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
