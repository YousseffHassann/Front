import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanesPopUpComponent } from './lanes-pop-up.component';

describe('LanesPopUpComponent', () => {
  let component: LanesPopUpComponent;
  let fixture: ComponentFixture<LanesPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanesPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanesPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
