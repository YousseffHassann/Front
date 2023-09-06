import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedSamplesComponent } from './deleted-samples.component';

describe('DeletedSamplesComponent', () => {
  let component: DeletedSamplesComponent;
  let fixture: ComponentFixture<DeletedSamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedSamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
