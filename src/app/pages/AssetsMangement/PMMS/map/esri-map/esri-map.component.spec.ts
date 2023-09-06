import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EsriMapPMMSComponent } from './esri-mapPMMS.component';

describe('EsriMapPMMSComponent', () => {
  let component: EsriMapPMMSComponent;
  let fixture: ComponentFixture<EsriMapPMMSComponent>;
  let app: any; // debugElement.componentInstance

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EsriMapPMMSComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(EsriMapPMMSComponent);
    app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verify default values', () => {
    expect(app.basemap).toEqual(jasmine.any(String));
    expect(app.center).toEqual(jasmine.any(Array));
    expect(app.zoom).toEqual(jasmine.any(Number));
    expect(app.mapLoaded).toEqual(false);
  });

});
