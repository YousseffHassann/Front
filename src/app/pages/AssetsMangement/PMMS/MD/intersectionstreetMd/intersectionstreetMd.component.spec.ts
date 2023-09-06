import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntersectionstreetMdComponent } from './intersectionstreetMd.component';

describe('IntersectionstreetComponent', () => {
  let component: IntersectionstreetMdComponent;
  let fixture: ComponentFixture<IntersectionstreetMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntersectionstreetMdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntersectionstreetMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
