/*
  Copyright 2019 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import { DataService } from "../../PMMS/PCI/data.service";
import { DataMdService } from "../../PMMS/MD/dataMd.service";

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { loadModules } from "esri-loader";
import { layer } from "esri/views/3d/support/LayerPerformanceInfo";
import esri = __esri; // Esri TypeScript Types

@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.scss"],
})
export class EsriMapComponent implements OnInit, OnDestroy {
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;
  @ViewChild("selectFilter") selectFilter: ElementRef;
  @ViewChild("nyc_graphics") listNode: ElementRef;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom =30;
 // private _center: Array<number> = [0.1278, 51.5074];
    private _center: Array<number> = [0.1278, 66.5074];

  private _basemap = "streets";
  private _loaded = false;
  private _view: esri.MapView = null;
  private _assetsView;
  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }
  centralid: string;

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor(private dataService: DataService,private datamdService:DataMdService) {}

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView, FeatureLayer] = await loadModules([
        "esri/Map",
        "esri/views/MapView",

        "esri/layers/FeatureLayer",
      ]);

      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
      };

      const map: esri.Map = new Map(mapProperties);
      // Initialize the MapView
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        highlightOptions: {
          color: [255, 241, 58],
          fillOpacity: 0.4,
        },
        zoom: this._zoom,
        map: map,
      };
      const listNode = document.getElementById("nyc_graphics");

      const selectFilter = document.getElementById("centralid");

      /********************
       * Add feature layer
       ********************/

      // Create the PopupTemplate
      const popupTemplate = {
        // autocasts as new PopupTemplate()

        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "ARNAME",
                label: "اسم الشارع",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
              {
                fieldName: "PCI_RATE  ",
                label: " مصدرضضضض البيان",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
              {
                fieldName: "ENNAME",
                label: "الاسم بالانجليزية",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
              {
                fieldName: "REGION_ID",
                label: "رقم المنطقة",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
            ],
          },
        ],
      };

      const featureLayer = new FeatureLayer({
       // url: "http://196.221.208.107/arcserver/rest/services/PMMS/PMMS01/MapServer/1",
       //url: "http://196.221.208.107/arcserver/rest/services/PMMS/PMMS01/MapServer/0",
       url: "http://localhost:6080/arcgis/rest/services/PMMS/PMMS01/MapServer/0",
        outFields: ["*"],
        popupTemplate: popupTemplate,

        // used by queryFeatures
      });
      let graphics;
      let highlightSelect;

      this._view = new MapView(mapViewProperties);
      map.add(featureLayer);

      await this._view.when();
      this.dataService.STREET_ID.subscribe((value1) => {
        this._view.whenLayerView(featureLayer).then((layerView) => {
          // creates the query that will be used to obtain the features needed for the highlight
          const queryStations = featureLayer.createQuery();
          // features that are passed in the highlight function need to have an `objectID`
          // if the query is built using `new Query()` then `queryStations.outFields = ["objectID"]` should be set

          queryStations.where = "STREET_ID=" + value1;
          featureLayer.queryFeatures(queryStations).then((result) => {
            // if a feature is already highlighted, then remove the highlight
            if (highlightSelect) {
              highlightSelect.remove();
            }

            // the feature to be highlighted
            const feature = result.features[0];

            // use the objectID to highlight the feature
            highlightSelect = layerView.highlight(
              feature.attributes["STREET_ID"]
            );

            // center the feature
            this._view
              .goTo(
                {
                  target: feature.geometry,
                  tilt: 70,
                  zoom: 14,
                },
                {
                  duration: 2000,
                }
              )
              .catch((error) => {
                if (error.name != "AbortError") {
                  console.error(error);
                }
              });
          });

          const buttons = document.querySelectorAll("button");
          for (let i = 0, button = null; (button = buttons[i]); i++) {
            button.addEventListener("click", onClick);
          }

          function onClick(event) {
            queryStations.where = `nom='${event.target.innerText}'`;
            featureLayer.queryFeatures(queryStations).then((result) => {
              // if a feature is already highlighted, then remove the highlight
              if (highlightSelect) {
                highlightSelect.remove();
              }

              // the feature to be highlighted
              const feature = result.features[0];

              // use the objectID to highlight the feature
              highlightSelect = layerView.highlight(
                feature.attributes["OBJECTID"]
              );

              // center the feature
              this._view
                .goTo(
                  {
                    target: feature.geometry,
                    tilt: 70,
                    zoom: 16,
                  },
                  {
                    duration: 2000,
                    easing: "in-out-expo",
                  }
                )
                .catch((error) => {
                  if (error.name != "AbortError") {
                    console.error(error);
                  }
                });
            });
          }
        });
        let text = "STREET_ID = " + value1;
        //  setFeatureLayerFilter(text);
        const resultId = value1;

        // the feature to be highlighted

        // use the objectID to highlight the feature
        // get the graphic corresponding to the clicked zip code
        const result = resultId && graphics && graphics[parseInt(resultId, 10)];

        if (result) {
          // open the popup at the centroid of zip code polygon
          // and set the popup's features which will populate popup content and title.

          this._view
            .goTo(result.geometry.extent.expand(2))
            .then(function () {
              this._view.popup.open({
                features: [result],
                location: result.geometry.centroid,
              });
            })
            .catch(function (error) {
              if (error.name != "AbortError") {
                console.error(error);
              }
            });
        }
      });

      this.datamdService.STREET_IDMd.subscribe((value2) => {
        this._view.whenLayerView(featureLayer).then((layerView) => {
          // creates the query that will be used to obtain the features needed for the highlight
          const queryStations = featureLayer.createQuery();
          // features that are passed in the highlight function need to have an `objectID`
          // if the query is built using `new Query()` then `queryStations.outFields = ["objectID"]` should be set

          queryStations.where = "STREET_ID=" + value2;
          featureLayer.queryFeatures(queryStations).then((result) => {
            // if a feature is already highlighted, then remove the highlight
            if (highlightSelect) {
              highlightSelect.remove();
            }

            // the feature to be highlighted
            const feature = result.features[0];

            // use the objectID to highlight the feature
            highlightSelect = layerView.highlight(
              feature.attributes["STREET_ID"]
            );

            // center the feature
            this._view
              .goTo(
                {
                  target: feature.geometry,
                  tilt: 70,
                  zoom: 14,
                },
                {
                  duration: 2000,
                }
              )
              .catch((error) => {
                if (error.name != "AbortError") {
                  console.error(error);
                }
              });
          });

          const buttons = document.querySelectorAll("button");
          for (let i = 0, button = null; (button = buttons[i]); i++) {
            button.addEventListener("click", onClick);
          }

          function onClick(event) {
            queryStations.where = `nom='${event.target.innerText}'`;
            featureLayer.queryFeatures(queryStations).then((result) => {
              // if a feature is already highlighted, then remove the highlight
              if (highlightSelect) {
                highlightSelect.remove();
              }

              // the feature to be highlighted
              const feature = result.features[0];

              // use the objectID to highlight the feature
              highlightSelect = layerView.highlight(
                feature.attributes["OBJECTID"]
              );

              // center the feature
              this._view
                .goTo(
                  {
                    target: feature.geometry,
                    tilt: 70,
                    zoom: 16,
                  },
                  {
                    duration: 2000,
                    easing: "in-out-expo",
                  }
                )
                .catch((error) => {
                  if (error.name != "AbortError") {
                    console.error(error);
                  }
                });
            });
          }
        });
        let text = "STREET_ID = " + value2;
        //  setFeatureLayerFilter(text);
        const resultId = value2;

        // the feature to be highlighted

        // use the objectID to highlight the feature
        // get the graphic corresponding to the clicked zip code
        const result = resultId && graphics && graphics[parseInt(resultId, 10)];

        if (result) {
          // open the popup at the centroid of zip code polygon
          // and set the popup's features which will populate popup content and title.

          this._view
            .goTo(result.geometry.extent.expand(2))
            .then(function () {
              this._view.popup.open({
                features: [result],
                location: result.geometry.centroid,
              });
            })
            .catch(function (error) {
              if (error.name != "AbortError") {
                console.error(error);
              }
            });
        }
      });
      this._view.whenLayerView(featureLayer).then(function (layerView) {
        this.layerView.watch("updating", function (value) {
          if (!value) {
            // wait for the layer view to finish updating

            // query all the features available for drawing.
            this.layerView
              .queryFeatures({
                geometry: this._view.extent,
                returnGeometry: true,
                orderByFields: ["STREET_ID"],
              })
              .then(function (results) {
                graphics = results.features;

                const fragment = document.createDocumentFragment();

                graphics.forEach(function (result, index) {
                  const attributes = result.attributes;
                  const name = attributes.ARNAME;

                  // Create a list zip codes in NY
                  const li = document.createElement("li");
                  li.classList.add("panel-result");
                  li.tabIndex = 0;
                  li.setAttribute("data-result-id", index);
                  li.textContent = name;

                  fragment.appendChild(li);
                });
                // Empty the current list
                this.listNode.innerHTML = "";
                this.listNode.appendChild(fragment);
              })
              .catch(function (error) {
                console.error("query failed: ", error);
              });
          }
        });
      });

      // listen to click event on the zip code list
      listNode.addEventListener("click", onListClickHandler);
      function setFeatureLayerFilter(expression) {
        featureLayer.definitionExpression = expression;
      }
      function onListClickHandler(event) {
        const target = event.target;
        const resultId = target.getAttribute("data-result-id");

        // get the graphic corresponding to the clicked zip code
        const result = resultId && graphics && graphics[parseInt(resultId, 10)];

        if (result) {
          // open the popup at the centroid of zip code polygon
          // and set the popup's features which will populate popup content and title.

          this._view
            .goTo(result.geometry.extent.expand(2))
            .then(function () {
              this._view.popup.open({
                features: [result],
                location: result.geometry.centroid,
              });
            })
            .catch(function (error) {
              if (error.name != "AbortError") {
                console.error(error);
              }
            });
        }
      }

      return this._view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then((mapView) => {
      // The map has been initialized
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  ngOnDestroy() {
    if (this._view) {
      // destroy the map view
      this._view.container = null;
    }
  }
}
