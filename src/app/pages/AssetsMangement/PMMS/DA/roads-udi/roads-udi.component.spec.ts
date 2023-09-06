import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadsUdiComponent } from './roads-udi.component';

describe('RoadsUdiComponent', () => {
  let component: RoadsUdiComponent;
  let fixture: ComponentFixture<RoadsUdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadsUdiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadsUdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
