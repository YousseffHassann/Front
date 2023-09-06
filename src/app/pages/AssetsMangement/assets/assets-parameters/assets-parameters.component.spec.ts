import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsParametersComponent } from './assets-parameters.component';

describe('AssetsParametersComponent', () => {
  let component: AssetsParametersComponent;
  let fixture: ComponentFixture<AssetsParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
