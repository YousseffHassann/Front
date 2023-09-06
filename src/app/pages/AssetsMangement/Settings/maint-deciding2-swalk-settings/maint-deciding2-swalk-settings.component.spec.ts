import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAINTDECIDING2SWALKSettingsComponent } from './maint-deciding2-swalk-settings.component';

describe('MAINTDECIDING2SWALKSettingsComponent', () => {
  let component: MAINTDECIDING2SWALKSettingsComponent;
  let fixture: ComponentFixture<MAINTDECIDING2SWALKSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MAINTDECIDING2SWALKSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MAINTDECIDING2SWALKSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
