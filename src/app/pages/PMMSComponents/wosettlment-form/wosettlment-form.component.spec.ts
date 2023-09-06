import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WosettlmentFormComponent } from './wosettlment-form.component';

describe('WosettlmentFormComponent', () => {
  let component: WosettlmentFormComponent;
  let fixture: ComponentFixture<WosettlmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WosettlmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WosettlmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
