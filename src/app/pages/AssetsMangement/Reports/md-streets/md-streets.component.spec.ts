import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDStreetsComponent } from './md-streets.component';

describe('MDStreetsComponent', () => {
  let component: MDStreetsComponent;
  let fixture: ComponentFixture<MDStreetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MDStreetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MDStreetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
