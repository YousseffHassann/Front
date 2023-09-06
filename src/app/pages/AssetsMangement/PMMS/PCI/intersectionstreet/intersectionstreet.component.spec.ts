import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntersectionstreetComponent } from './intersectionstreet.component';

describe('IntersectionstreetComponent', () => {
  let component: IntersectionstreetComponent;
  let fixture: ComponentFixture<IntersectionstreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntersectionstreetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntersectionstreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
