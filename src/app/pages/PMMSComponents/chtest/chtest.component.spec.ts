import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChtestComponent } from './chtest.component';

describe('ChtestComponent', () => {
  let component: ChtestComponent;
  let fixture: ComponentFixture<ChtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
