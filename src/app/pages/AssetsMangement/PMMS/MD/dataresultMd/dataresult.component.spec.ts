import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataresultMdComponent } from './dataresultMd.component';

describe('DataresultComponent', () => {
  let component: DataresultMdComponent;
  let fixture: ComponentFixture<DataresultMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataresultMdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataresultMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
