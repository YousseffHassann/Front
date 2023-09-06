import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenralSetting1Component } from './genral-setting1.component';

describe('GenralSetting1Component', () => {
  let component: GenralSetting1Component;
  let fixture: ComponentFixture<GenralSetting1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenralSetting1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenralSetting1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
