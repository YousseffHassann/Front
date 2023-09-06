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
import { DataService } from "../../PCI/data.service";
import { DataMdService } from "../../MD/dataMd.service";
import { AssetsSettingsService } from "../../../assets-settings.service"

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
  selector: "app-esri-mapPMMS",
  templateUrl: "./esri-mapPMMS.component.html",
  styleUrls: ["./esri-mapPMMS.component.scss"],
})
export class EsriMapPMMSComponent implements OnInit, OnDestroy {
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
  private _zoom = 20;
 private _center: Array<number> = [50.1474, 26.3927];
    //private _center: Array<number> = [0.1278, 51.5074];

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

  constructor(private dataService: DataService, private datamdService: DataMdService, private ppmsserveice: AssetsSettingsService) { }

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView, FeatureLayer, Legend, BasemapGallery, Expand, LayerList, Fullscreen] = await loadModules([
        "esri/Map",
        "esri/views/MapView",

        "esri/layers/FeatureLayer",
        "esri/widgets/Legend",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Expand",
        "esri/widgets/LayerList",
        "esri/widgets/Fullscreen"
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
      // const popupTemplate = {
      //   // autocasts as new PopupTemplate()

      //   content: [
      //     {
      //       type: "fields",
      //       fieldInfos: [
      //         {
      //           fieldName: "ARNAME",
      //           label: "اسم الشارع",
      //           format: {
      //             places: 0,
      //             digitSeparator: true,
      //           },
      //         },
      //         {
      //           fieldName: "DATASOURCE ",
      //           label: " مصدر البيان",
      //           format: {
      //             places: 0,
      //             digitSeparator: true,
      //           },
      //         },
      //         {
      //           fieldName: "ENNAME",
      //           label: "الاسم بالانجليزية",
      //           format: {
      //             places: 0,
      //             digitSeparator: true,
      //           },
      //         },
      //         {
      //           fieldName: "REGION_ID",
      //           label: "رقم المنطقة",
      //           format: {
      //             places: 0,
      //             digitSeparator: true,
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // };

      // const popupTemplate2 = {
      //   // autocasts as new PopupTemplate()

      //   content: [
      //     {
      //       type: "fields",
      //       fieldInfos: [
      //         {
      //           fieldName: "JPMMS.%PCI_SECTIONS2.SECTION_AREA",
      //           label: "SECTION_AREA ",
      //           format: {
      //             places: 0,
      //             digitSeparator: true,
      //           },
      //         },
      //         {
      //           fieldName: "JPMMS.%PCI_SECTIONS2.STREET_ID",
      //           label: " STREET_ID ",
      //           format: {
      //             places: 0,
      //             digitSeparator: true,
      //           },
      //         },
      //         {
      //           fieldName: "JPMMS.%PCI_SECTIONS2.PCI_VALUE",
      //           label: "PCI_VALUE ",
      //           format: {
      //             places: 0,
      //             digitSeparator: true,
      //           },
      //         },
      //         {
      //           fieldName: "JPMMS.%PCI_SECTIONS2.PCI_RATE",
      //           label: " PCI_RATE",
      //           format: {
      //             places: 0,
      //             digitSeparator: true,
      //           },
      //         },
      //       ],
      //     },
      //   ],
      // };
      const popupTemplate = {
        // autocasts as new PopupTemplate()

        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "ENNAME ",
                label: "Street Name ",
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
              {
                fieldName: "MAIN_NO",
                label: "  MAIN_NO",
                format: {
                  places: 0,
                  digitSeparator: false,
                },
              },


            ],
          },
        ],
      };

      const popupTemplate2 = {
        // autocasts as new PopupTemplate()

        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "JPMMS.%PCI_SECTIONS2.PCI_RATE",
                label: "PCI_RATE",
                format: {
                  places: 0,
                  digitSeparator: false,
                },
              },
              {
                fieldName: "JPMMS.%PCI_SECTIONS2.SECTION_NO",
                label: " SECTION_NO ",
                format: {
                  places: 0,
                  digitSeparator: false,
                },
              },
              {
                fieldName: "JPMMS.%PCI_SECTIONS2.PCI_VALUE",
                label: "PCI_VALUE ",
                format: {
                  places: 0,
                  digitSeparator: false,
                },
              },
 {
                fieldName: "JPMMS.Sections.STREET_ID",
                label: "STREET_ID ",
                
                format: {
                  places: 0,
                  digitSeparator: false,
                },
              },
            ],
          },
        ],
      };

      const popupTemplate3 = {
        // autocasts as new PopupTemplate()

        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "SECTION_NO",
                label: "SECTION NO",
                format: {
                  places: 0,
                  digitSeparator: false,
                },
              },
              {
                fieldName: "MAIN_NO",
                label: "MAIN NO",
                format: {
                  places: 0,
                  digitSeparator: false,
                },
              },


            ],
          },
        ],
      };
      // const renderer = {
      //   type: "simple-line", // autocasts as new SimpleRenderer()
      //   symbol: {
      //     type: "simple-line", // autocasts as new SimpleMarkerSymbol()
      //     // Arrow marker
      //     color: [250, 250, 250],
      //     outline: {
      //       color: [255, 255, 255, 0.5],
      //       width: 0.5
      //     },
      //     angle: 180,
      //     size: 15
      //   },
      //   visualVariables: [


      //     {
      //       type: "color",
      //       field: "PCI_RATE",
      //       stops: [
      //         { value: 'Good', color: "#2b83ba" },
      //         { value: 'Fair', color: "#abdda4" },
      //         { value: 'Excellent', color: "#ffffbf" },

      //       ]
      //     }
      //   ]
      // };
      const colors = ["#3cccb4", "#191eb0", "#ffdf3c", "#c27c30", "#0af00a"];

      const commonProperties = {
        type: "simple-line",
        width: "5px",
        style: "solid"
      };



      // Symbol for U.S. Highways
      const Excellent
        = {
        ...commonProperties,
        color: colors[1]
      };

      // Symbol for state highways
      const Good
        = {
        ...commonProperties,
        color: colors[2]
      };

      // Symbol for other major highways
      const Fair = {
        ...commonProperties,
        color: colors[3]
      };

      // Symbol for other major highways
      const otherSym = {
        ...commonProperties,
        color: colors[3]
      };

      const renderer = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        legendOptions: {
          title: "Route type"
        },
        defaultSymbol: otherSym,
        defaultLabel: 'otherSym',
        field: "JPMMS.%PCI_SECTIONS2.PCI_RATE",

        uniqueValueInfos: [
          {
            value: "Excellent", // code for interstates/freeways
            symbol: Excellent,
            label: 'Excellent'
          },
          {
            value: "Good", // code for U.S. highways
            symbol: Good,
            label: "Good"
          },
          {
            value: "Fair", // code for U.S. highways
            symbol: Fair,
            label: "Fair"
          }
        ]
      };

      const featureLayer = new FeatureLayer({
       // url: this.ppmsserveice.gishost + "arcserver/rest/services/PMMS/PMMS01/MapServer/1",
     
       url: this.ppmsserveice.maps.map1,

     
     
      // url: "http://localhost:6080/arcgis/rest/services/PMMS/PMMS01/MapServer/1",

       // url: "http://196.221.208.107/arcserver/rest/services/PMMS/PMMS01/MapServer/1",
        outFields: ["*"],
        popupTemplate: popupTemplate2,
        renderer: renderer,
        title: "SECTIONS PCI",

        // used by queryFeatures
      });
      let graphics;
      let highlightSelect;

      this._view = new MapView(mapViewProperties);

      const featureLayer2 = new FeatureLayer({
       // url: this.ppmsserveice.gishost + "arcserver/rest/services/PMMS/PMMS01/MapServer/0",
   
       url: this.ppmsserveice.maps.map0,

       //   url: "http://localhost:6080/arcgis/rest/services/PMMS/PMMS01/MapServer/0",

       // url: "http://196.221.208.107/arcserver/rest/services/PMMS/PMMS01/MapServer/0",
        outFields: ["*"],
        popupTemplate: popupTemplate,
        title: "Streets",

        // used by queryFeatures
      });

const featureLayer3 = new FeatureLayer({
        url: this.ppmsserveice.maps.map3,

        //url: "http://196.221.208.107/arcserver/rest/services/PMMS/PMMS01/MapServer/1",
        outFields: ["*"],
        popupTemplate: popupTemplate3,
        renderer: renderer,
        title: "SECTIONS",

        // used by queryFeatures
      });
      this._view = new MapView(mapViewProperties);




      const referenceScale = 9244650;




      this._view = new MapView(mapViewProperties);


      map.add(featureLayer2);

      map.add(featureLayer);
      map.add(featureLayer3);

      featureLayer3.visible = false;

      featureLayer.visible = false;


      const layerList = new LayerList({
        view: this._view
      });
      const expand2 = new Expand({
        view: this._view,
        content: layerList,
        expandIconClass: "esri-icon-layer-list"
      });
      this._view.ui.add(expand2, "top-right");



      const basemapGallery = new BasemapGallery({
        view: this._view
      });

      // Add the widget to the top-right corner of the view
      const expand = new Expand({
        view: this._view,
        content: basemapGallery,
        expandIconClass: "esri-icon-basemap" // Optional: Change the icon to indicate basemap selection
      });

      // Add the Expand widget to the top-right corner of the view
      this._view.ui.add(expand, "top-right");


      const legendWidget = new Legend({
        view: this._view,
      });
      const expand3 = new Expand({
        view: this._view,
        content: legendWidget,
        expandIconClass: "esri-icon-legend"
      });
      // Add the Legend widget to the bottom-right corner of the view
      this._view.ui.add(expand3, "top-right");

      const fullscreen = new Fullscreen({
        view: this._view
      });
      this._view.ui.add(fullscreen, "top-left");


 




      // this._view.ui.add(new Legend(this._view
      // ), "bottom-right");




      await this._view.when();
      this.dataService.STREET_ID.subscribe((value1) => {
        this._view.whenLayerView(featureLayer2).then((layerView) => {
          // creates the query that will be used to obtain the features needed for the highlight
          const queryStations = featureLayer2.createQuery();
          // features that are passed in the highlight function need to have an `objectID`
          // if the query is built using `new Query()` then `queryStations.outFields = ["objectID"]` should be set
          queryStations.where = "STREET_ID =" + value1;

          //queryStations.where = "JPMMS.Sections.OBJECTID = 6025";
          featureLayer2.queryFeatures(queryStations).then((result) => {
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
                  tilt:30,
                  zoom:10,
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

       
        });

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
              feature.attributes["OBJECTID"]
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
      this._view.whenLayerView(featureLayer2).then(function (layerView) {
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
