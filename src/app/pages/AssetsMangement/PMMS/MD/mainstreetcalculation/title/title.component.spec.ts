import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TitleMdComponent } from "./title.component";

describe("TitleMdComponent", () => {
  let component: TitleMdComponent;
  let fixture: ComponentFixture<TitleMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleMdComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
