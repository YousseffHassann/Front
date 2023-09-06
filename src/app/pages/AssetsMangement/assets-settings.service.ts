import { EventEmitter, Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';
import { NbMenuItem } from "@nebular/theme";
import { PRIOLANES2Component } from "./Reports/prio-lanes2/prio-lanes2.component";

@Injectable({
  providedIn: "root",
})
export class AssetsSettingsService {

  dataEmitter = new EventEmitter<string>();
  raisDataEmitterEvent(data: string) {
    this.dataEmitter.emit(data);
  }

  StatusTime=60000*1;


  public Menu1: string


  Roles =
    [
      {
        RoleName: "Superuser",
        RolId: 2,
        // Menu: [
        //   {
        //     title: 'Superuser',
        //     link: '/pages/assets-management/user',
        //     children: [
        //       {
        //         title: 'إنشاء حساب',
        //         link: '/pages/assets-management/user/createAccount',

        //       },
        //       {
        //         title: 'تسجيل الدخول',
        //         link: '/pages/assets-management/user/login',

        //       },
        //       {
        //         title: 'إدارة الحسابات',
        //         link: '/pages/assets-management/user/ManageAccounts',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'الاصول',
        //     link: '/pages/assets-management/assets',
        //   },
        //   {
        //     title: 'إحصاءات الأصول ',
        //     link: '/pages/assets-management/assets-charts',
        //   },
        //   {
        //     title: 'احصائيات متقدمة',
        //     link: '/pages/assets-management/advanced-charts',
        //   },
        //   {
        //     title: 'خريطة1',
        //     link: '/pages/assets-management/map1',
        //   },
        //   {
        //     title: 'الخرائط',
        //     link: '/pages/assets-management/mapping',
        //   },

        // ]

        Menu: [
          {
            title: this.translate.instant('menu.users'),
            link: "/pages/assets-management/user",
            children: [
              {
                title: this.translate.instant('menu.addusers'),
                link: "/pages/assets-management/user/createAccount",
              },
              // {
              //   title: "تسجيل الدخول",
              //   link: "/pages/assets-management/user/login",
              // },
              {
                title: this.translate.instant('menu.welcome2'),
                link: "/pages/assets-management/Welcome",
              },
//THIS55
              // {
              //   title: "  Update Streets ",
              //   link: "/pages/UpdateRgionSectionComponent",
              // },


              // {
              //   title: "إدارة الحسابات",
              //   link: "/pages/assets-management/user/ManageAccounts",
              // },
            ],
          },



          {
            title: this.translate.instant('menu.pmms'),
            link: "/pages/assets-management/PMMS",
            children: [

              {
                //   title: "إعدادات النظام",
                title: this.translate.instant('menu.SystemSettings'),
                children: [
                  {
                    /// title: "اعدادت تعميم قرارات الصيانة (4-36)",
                    title: this.translate.instant('menu.preparingthecricalculationmd'),

                    link: "/pages/assets-management/generalsettings",
                  }
                  ,
                  {
                    //   title: "اعدادت قرارات الصيانة للعيوب",
                    title: this.translate.instant('menu.Preparingmaintenancedecisionsfordefects'),

                    link: "/pages/assets-management/maintdeciding",
                  },
                  {
                    //  title: "اعدادت قرارات الصيانة لعيوب الأرصفة ",
                    title: this.translate.instant('menu.Preparingmaintenancedecisionsforsidewalkdefects'),

                    link: "/pages/assets-management/maintdeciding2swalk",
                  }
                ],
              },
              {
                //   title: "تحليل النظام",

                title: this.translate.instant('menu.SystemAnalysis'),


                children: [
                  // {
                  //   title: "مقارنة العيوب مع حاله الوعورة  DDF - IRI ",
                  //   link: "/pages/assets-management/EquipmentEight",
                  // },


                  {
                    //  title: "تفاصيل الشوارع الرئيسية المعده ",
                    title: this.translate.instant('menu.Mainstreetdetails'),

                    link: "/pages/assets-management/EquipmentSectionsDetails",

                  },
                  {
                    // title: " بيانات العينات المحذوفه ومدخل عليها عيوب ",
                    title: this.translate.instant('menu.Dataofdeletedsamplesanddefectsentered'),

                    link: "/pages/assets-management/DeletedSamples",
                  },


                  {
                    //  title: "إستوائية رصف الطريق مقاطع IRI ",
                    title: this.translate.instant('menu.TropicalPavementIRIClips'),

                    link: "/pages/assets-management/equipmentone",
                  }
                  ,

                  // {
                  //   title: "مقارنة اطوال المعده والنظام IRI ",
                  //   link: "/pages/assets-management/EquipmentTwo",
                  // },
                  {
                    //  title: "حارات مربوطة خطأ بالمقاطع",
                    title: this.translate.instant('menu.Lanesmistakenlylinkedtosections'),

                    link: "/pages/assets-management/LaneSectionsErorrs",
                  },
                  //  {
                  //   title: "اطوال شوارع الرسم ",
                  //   link: "/pages/assets-management/EquipmentLenth",
                  // },
                  {
                    //   title: " تفاصيل حالة الشوارع  ",
                    title: this.translate.instant('menu.Streetconditiondetails'),

                    link: "/pages/assets-management/RoadesUdi",
                  },
                  // {
                  //   title: " مراجعة أطوال المعده والنظام ",
                  //   link: "/pages/assets-management/equipment-fourteen",
                  // },
                  {
                    //   title: " حارات بالمعدة وغير موجودة بالنظام  IRI",
                    title: this.translate.instant('menu.LanewithequipmentandnotintheIRIsystem'),

                    link: "/pages/assets-management/equipment-validate-iri",
                  }, {
                    // title: " حارات بالمعدة وغير موجودة بالنظام  FWD",
                    title: this.translate.instant('menu.LanewithequipmentandnotintheFWDsystem'),

                    link: "/pages/assets-management/equipment-validate-fwd",
                  },
                  {
                    // title: " حارات بالمعدة وغير موجودة بالنظام  SKID",
                    title: this.translate.instant('menu.LanewithequipmentandnotintheSKIDsystem'),

                    link: "/pages/assets-management/equipment-validate-skid",
                  }, {
                    //title: " حارات بالمعدة وغير موجودة بالنظام  GPR",
                    title: this.translate.instant('menu.LanewithequipmentandnotintheGPRsystem'),


                    link: "/pages/assets-management/equipment-validate-gpr",
                  },
                ],
              },
              //updated
              {
                //title: " الاحصائيات",
                title: this.translate.instant('menu.statistics'),

                children: [
                  {
                    // title: "  rاحصائيات العيوب ",
                    title: this.translate.instant('menu.defectsstatistics'),

                    //link: "PMMS/mycharts/mycharts",
                    //link: "/pages/mychart",
                    link: "/pages/chtest",
                  },
                  {
                    // title: "   احصائيات التكلفة  ",
                    title: this.translate.instant('menu.coststatistics'),

                    //link: "PMMS/mycharts/mycharts",
                    //link: "/pages/",
                    link: "/pages/chtest2",
                  },
                  // {
                  //    title: " 0000000000000000000000000000000  احصائيات التكلفة  ",

                  //   //link: "PMMS/mycharts/mycharts",
                  //   //link: "/pages/",
                  //   link: "/pages/chtest2",
                  // },
                  {
                    //  title: "   اضافة صلاحية   ",
                    title: this.translate.instant('menu.addrole'),

                    //link: "PMMS/mycharts/mycharts",
                    //link: "/pages/mychart",
                    link: "/pages/sec_roles",
                  },
                  {
                    // title: "   اضافة مستخدم   ",
                    title: this.translate.instant('menu.adduser'),

                    //link: "PMMS/mycharts/mycharts",
                    //link: "/pages/mychart",
                    link: "/pages/adduser",
                  }, {
                    title: "   اضافة مستخدم   ",
                    link: "/pages/adduser",
                  },


                  // {
                  //   title: "تعديل  الشوارع ",
                  //   link: "/pages/UpdateRgionSectionComponent",
                  // },
                  /* {
                     title: "   My char  ",
                     //link: "PMMS/mycharts/mycharts",
                     //link: "/pages/mychart",
                     link: "/pages/abarChar",
                   },*/

                  {
                    title: "  مقاطع الطرق الرئيسية  ",
                    link: "/pages/DistressSurvey",
                  },

                  {
                    title: "  تقاطعات الطرق الرئيسية  ",
                    link: "/pages/insertIntersectionDistress",
                  },
                  // {
                  //   title: "المناطق والطرق الفرعية ",
                  //   link: "/pages/RegionDistress",
                  // },

                  {
                    title: this.translate.instant('menu.Descriptivedataformajorroadsegments'),


                    // title: "بيانات وصفية لمقاطع الطرق الرئيسية ",
                    link: "/pages/SectionUpdateComponent",
                  },



                  // {
                  //   title: "بيانات وصفية لمقاطع الطرق الرئيسية ",
                  //   link: "/pages/SectionUpdateComponent",
                  // },

                  // {
                  // //  title: "بيانات وصفية لتقاطعات الطرق الرئيسية ",
                  //   title: this.translate.instant('menu.sec'),
                  //   link: "/pages/IntersectionUpdateComponent",
                  // },

                  // {
                  //  // title: "بيانات وصفية للمناطق والطرق الفرعية ",
                  //   title: this.translate.instant('menu.reg'),
                  //   link: "/pages/RegionUpdateComponent",
                  // },

                  // {
                  //   title: "UploadFile ",
                  //   link: "/pages/UploadFileComponent",
                  // },




                  /*   {
                       title: "    عرض الصلاحيات  ",
                       //link: "PMMS/mycharts/mycharts",
                       //link: "/pages/mychart",
                       link: "/pages/showroles",
                     },

                     {
                       title: "    عرض العملاء   ",
                       //link: "PMMS/mycharts/mycharts",
                       //link: "/pages/mychart",
                       link: "/pages/showusers",
                     },*/
                ],
              },

              {
                //  title: "حسابات حالة الرصف",
                title: this.translate.instant('menu.pavementcoditioncalculation'),


                link: "/pages/assets-management/PMMS",
              },
              {
                //  title: "قرارت الصيانه",
                title: this.translate.instant('menu.PMMSMD'),

                link: "/pages/assets-management/PMMSMD",
              },
              {
                // title: "خطط الصيانه",
                title: this.translate.instant('menu.maintenanceplane'),

                children: [
                  {
                    //  title: "الخطة والموازنة",
                    title: this.translate.instant('menu.planning'),

                    link: "/pages/assets-management/PLanning",
                  },



                ],
              },
              {
                //  title: "  المقاولين والعقود",
                title: this.translate.instant('menu.contractorsandcontracts'),

                children: [
                  {
                    //  title: "  المقاولين",
                    title: this.translate.instant('menu.Contractor'),

                    link: "/pages/assets-management/Contractor",
                  }

                ],
              },
              {
                // title: "  التقارير ",
                title: this.translate.instant('menu.reports'),

                children: [
                  {
                    title: this.translate.instant('menu.PCI_InterSections'),

                    // title: "  PCI_InterSections",
                    link: "/pages/assets-management/PCI_InterSections",
                  }, {
                    title: this.translate.instant('menu.reports'),
                    link: "/pages/assets-management/md_reports",
                  }, {
                    title:  this.translate.instant('menu.mdreports'),
                    link: "/pages/assets-management/md_reports",
                  }

                ],
              },

            ],


          },



        ]
        , Routes: [

          '/pages/assets-management/user'
          , '/pages/assets-management/PMMS'
          , '/pages/assets-management/PMMSMD'
          , '/pages/assets-management/EquipmentSectionsDetails'
          , '/pages/assets-management/generalsettings'
          , '/pages/assets-management/maintdeciding'
          , '/pages/assets-management/maintdeciding2swalk'
          , '/pages/assets-management/DeletedSamples'
          , '/pages/assets-management/equipmentone'
          , '//pages/assets-management/LaneSectionsErorrs'
          , '/pages/assets-management/RoadesUdi'
          , '/pages/assets-management/equipment-validate-iri'
          , '/pages/assets-management/equipment-validate-fwd'
          , '/pages/assets-management/equipment-validate-skid'
          , '/pages/assets-management/equipment-validate-gpr'
          , '/pages/charts/chartjs'
          , '/pages/charts/echarts'
          , '/pages/sec_roles'
          , '/pages/adduser'
          , '/pages/assets-management/Welcome'
          , '/pages/assets-management/LaneSectionsErorrs'
          , '/pages/assets-management/PLanning'
          , '/pages/assets-management/PCI_InterSections'
          , '/pages/chtest'
          , '/pages/chtest2'
          , '/pages/SectionUpdateComponent'
          , '/pages/assets-management/md_reports'

        ]


      }
      ,


































//44444444444444444

      {
        RoleName: "DataEntryRole",
        RolId: 4,

        Menu: [
          {

            title: this.translate.instant('menu.pmms'),
            link: "/pages/assets-management/PMMS",
            children: [




              {
                //   title: "إعدادات النظام",
                title: this.translate.instant('menu.networkdeandide'),
                children: [



              // {
              //   title:"  Refresh",
              //   link: "/pages/Refresh",
              // },




                  {
                    title:  this.translate.instant('menu.networkdef'),
                    link: "/pages/MapStatic",
                  },


              {
                title: this.translate.instant('menu.networkide'),
                link: "/pages/Structure",
              },



                ],
              },









              {
                //   title: "تحليل النظام",

                title: this.translate.instant('menu.dataana'),


                children: [
                  // {
                  //   title: "مقارنة العيوب مع حاله الوعورة  DDF - IRI ",
                  //   link: "/pages/assets-management/EquipmentEight",
                  // },
                  // {
                  //   //  title: "تفاصيل الشوارع الرئيسية المعده ",
                  //   title: this.translate.instant('menu.Mainstreetdetails'),

                  //   link: "/pages/assets-management/EquipmentSectionsDetails",

                  // },

                  {
                    title: this.translate.instant('menu.datauplandpcicalc'),
                    link: "/pages/UploadFileComponent",
                  },

                ],
              },



              {

               title: this.translate.instant('menu.pavementconind'),
                children: [

                  {
                    title: this.translate.instant('menu.pcidet'),
                    link: "/pages/PCICALCComponent",
                  },
                  {
                    //  title: "حسابات حالة الرصف",
                    title: this.translate.instant('menu.pavementcoditioncalculation'),


                    link: "/pages/assets-management/PMMS",
                  },
                  {
                    title: "UnCalculated Sections",
                    link: "/pages/UncalculatedSectionsComponent",
                  },



                  //88

                ],
              },


              {
                //  title: "قرارت الصيانه",
                title: this.translate.instant('menu.PMMSMD'),

                link: "/pages/assets-management/PMMSMD",
              },
              {
                // title: "خطط الصيانه",
                title: this.translate.instant('menu.maintenanceplane'),

                children: [
                  {
                    //  title: "الخطة والموازنة",
                    title: this.translate.instant('menu.planning'),

                    link: "/pages/assets-management/PLanning",
                  },

                  {
                    title: this.translate.instant('menu.bugetplanlanes'),
                    link: "/pages/BudgetLanes",
                  },

                ],
              },
              // {       this contract DeLETEED
              //   //  title: "  المقاولين والعقود",
              //   title: this.translate.instant('menu.contractorsandcontracts'),

              //   children: [
              //     {
              //       //  title: "  المقاولين",
              //       title: this.translate.instant('menu.Contractor'),

              //       link: "/pages/assets-management/Contractor",
              //     }

              //   ],
              // },
              {
                // title: "  التقارير ",
                title: this.translate.instant('menu.reports'),

                children: [
                  {
                    title: this.translate.instant('menu.PCI_InterSections'),

                    // title: "  PCI_InterSections",
                   link: "/pages/pci-intersections",
                   // link: "/pages/assets-management/pci-intersections",
                  }, {
                    title: this.translate.instant('menu.irireport'),
                   link: "/pages/maintenance-reports",
                  },
                  {
                    title: this.translate.instant('menu.mdreport'),
                    link: "/pages/assets-management/md_reports",
                   // link: "/pages/maintenance-reports",
                  },
                  {
                    title:  this.translate.instant('menu.mdreportstreet'),
                    link: "/pages/md_streets",
                   // link: "/pages/maintenance-reports",
                  },
                  {

                    title:  this.translate.instant('menu.mpriority'),
                    link: "/pages/PRIOLANES2Component",
                  },
                  {

                    title:   this.translate.instant('menu.allreports'),
                    link: "/pages/AllReports",
                  },

                  {
                    // title: "  rاحصائيات العيوب ",
                    title: this.translate.instant('menu.defectsstatistics'),

                    //link: "PMMS/mycharts/mycharts",
                    //link: "/pages/mychart",
                    link: "/pages/chtest",
                  },
                  {
                    title:this.translate.instant('menu.mdchart'),
                    link: "/pages/ChartCost3",
                  },
                  {
                    // title: "   احصائيات التكلفة  ",
                    title: this.translate.instant('menu.coststatistics'),

                    //link: "PMMS/mycharts/mycharts",
                    //link: "/pages/",
                    link: "/pages/chtest2",
                  },


                ],
              },

              {
                //   title: "إعدادات النظام",
                title:this.translate.instant('menu.summary'),
                children: [
                  {
                    /// title: "اعدادت تعميم قرارات الصيانة (4-36)",
                     title:this.translate.instant('menu.dash'),


                    link: "assets-management/Welcome",
                  }

                ],
              },


              // {
              //   title: "Summary Dashboard ",
              //   link: "/pages/SummaryDashboarComponent",
              // },
              // {
              //   // title: "  التقارير ",
              //   title: "WorkOrders",
              //   link: "/pages/WorkOrdersComponent"

              // },




              // {
              //   // title: "  التعديل",
              //  // title: this.translate.instant('menu.reports'),
              //   title:" Data Editing",
              //   children: [
              //     {
              //       //  title: "بيانات وصفية لتقاطعات الطرق الرئيسية ",
              //       title: this.translate.instant('menu.sec'),
              //       link: "/pages/IntersectionUpdateComponent",
              //     },

              //     {
              //       // title: "بيانات وصفية للمناطق والطرق الفرعية ",
              //       title: this.translate.instant('menu.reg'),
              //       link: "/pages/RegionUpdateComponent",
              //     },



              //   ],
              // },

            ],








          },




        ]
        , Routes: [


          '/pages/assets-management/user'
          , '/pages/assets-management/PMMS'
          , '/pages/assets-management/PMMSMD'
          , '/pages/assets-management/EquipmentSectionsDetails'
          // , '/pages/assets-management/generalsettings'
          // , '/pages/assets-management/maintdeciding'
          // , '/pages/assets-management/maintdeciding2swalk'
          , '/pages/assets-management/DeletedSamples'
          , '/pages/assets-management/equipmentone'
          , '//pages/assets-management/LaneSectionsErorrs'
          , '/pages/assets-management/RoadesUdi'
          , '/pages/assets-management/equipment-validate-iri'
          , '/pages/assets-management/equipment-validate-fwd'
          , '/pages/assets-management/equipment-validate-skid'
          , '/pages/assets-management/equipment-validate-gpr'
          , '/pages/charts/chartjs'
          , '/pages/charts/echarts'
          , '/pages/sec_roles'
          , '/pages/adduser'
          , '/pages/UploadFileComponent'

          , '/pages/assets-management/Welcome'
          , '/pages/assets-management/LaneSectionsErorrs'
          , '/pages/assets-management/PLanning'
          , '/pages/assets-management/PCI_InterSections'
          , '/pages/chtest'
          , '/pages/chtest2'
          , '/pages/SectionUpdateComponent'
          , '/pages/assets-management/md_reports',
          '/pages/PCICALCComponent'


        ]
      }

      ,































      {
        RoleName: "DataEntryRole",
        RolId: 1,

        Menu: [
          {
            title: this.translate.instant('menu.users'),
            link: "/pages/assets-management/user",
            children: [
              {
                title: this.translate.instant('menu.addusers'),
                link: "/pages/adduser",
              },
              {
                title: "  Update Streets ",
                link: "/pages/UpdateRgionSectionComponent",
              },
              {
                title: "Surveys",
                //title: this.translate.instant('menu.TropicalPavementIRIClips'),

                link: "/pages/survey",
              },


              // {
              //   title: "تسجيل الدخول",
              //   link: "/pages/assets-management/user/login",
              // },
              {
                title: this.translate.instant('menu.welcome2'),
                link: "/pages/assets-management/Welcome",
              },
              // {
              //   title: "إدارة الحسابات",
              //   link: "/pages/assets-management/user/ManageAccounts",
              // },
            ],
          },
          {
            title: this.translate.instant('menu.pmms'),
            link: "/pages/assets-management/PMMS",
            children: [

              {
                //   title: "إعدادات النظام",
                title: this.translate.instant('menu.SystemSettings'),
                children: [
                  {
                    /// title: "اعدادت تعميم قرارات الصيانة (4-36)",
                    title: this.translate.instant('menu.preparingthecricalculationmd'),

                    link: "/pages/assets-management/generalsettings",
                  }
                  ,
                  {
                    //   title: "اعدادت قرارات الصيانة للعيوب",
                    title: this.translate.instant('menu.Preparingmaintenancedecisionsfordefects'),

                    link: "/pages/assets-management/maintdeciding",
                  },
                  {
                    //  title: "اعدادت قرارات الصيانة لعيوب الأرصفة ",
                    title: this.translate.instant('menu.Preparingmaintenancedecisionsforsidewalkdefects'),

                    link: "/pages/assets-management/maintdeciding2swalk",
                  }
                ],
              },






            ],


          },



        ]
        , Routes: [

          '/pages/assets-management/user'
          , '/pages/assets-management/PMMS'
          , '/pages/assets-management/PMMSMD'
          , '/pages/assets-management/EquipmentSectionsDetails'
          , '/pages/assets-management/generalsettings'
          , '/pages/assets-management/maintdeciding'
          , '/pages/assets-management/maintdeciding2swalk'
          , '/pages/assets-management/DeletedSamples'
          , '/pages/assets-management/equipmentone'
          , '//pages/assets-management/LaneSectionsErorrs'
          , '/pages/assets-management/RoadesUdi'
          , '/pages/assets-management/equipment-validate-iri'
          , '/pages/assets-management/equipment-validate-fwd'
          , '/pages/assets-management/equipment-validate-skid'
          , '/pages/assets-management/equipment-validate-gpr'
          , '/pages/charts/chartjs'
          , '/pages/charts/echarts'
          , '/pages/sec_roles'
          , '/pages/adduser'
          , '/pages/assets-management/Welcome'
          , '/pages/assets-management/LaneSectionsErorrs'
          , '/pages/assets-management/PLanning'
          , '/pages/assets-management/PCI_InterSections'
          , '/pages/chtest'
          , '/pages/chtest2'
          , '/pages/SectionUpdateComponent'
          , '/pages/assets-management/md_reports'

        ]

      }
    ];

  constructor(private translate: TranslateService, private httpClient: HttpClient,
  ) {


    translate.setDefaultLang('en');
    translate.use('en');
    // alert(this.translate.instant("LogIn"));





  }



  setting1 = [1, 2];

  mapSettings = {};

  //PhysicalStatus :1 , 2 , 3

  Lookup = {
    PhysicalStatus: {
      code: 1,
      Excellent: {
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [255, 99, 132, 0.5],
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 1,
            color: "white",
          },
        },
      },

      Good: {
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [255, 206, 86, 0.5],
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 1,
            color: "white",
          },
        },
      },

      Fair: {
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [54, 162, 235, 0.5],
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 1,
            color: "white",
          },
        },
      },
    },
    OwnerShipType: {
      code: 3,
    },
    UsageType: {
      code: 2,
    },

    Type: {
      code: 4,
    },
    LegalStatus: {
      code: 5,
    },
    RentalStatus: { code: 6 },
    InvestmentStatus: { code: 7 },
    InvestmentValue: { code: 8 },
  };

//MAP LAYER AHMED
  GovLayer = {
    url: "../../assets/data/Governorates.geojson",
    renderer: {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: [153, 255, 255, 0],
        outline: {
          // autocasts as new SimpleLineSymbol()
          width: 1,
          color: "red",
        },
      },
    },
  };
  ResultsLayer = {
    renderer: {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: [153, 255, 255, 0],
        outline: {
          // autocasts as new SimpleLineSymbol()
          width: 1,
          color: "blue",
        },
      },
    },
  };
  //working dev
  //  hostaddress2 = "https://localhost:44310/api/"  //locally
  //hostaddress2 = "https://10.0.0.2:8088/api/"  //deploied
  //hostaddress2 = "http://localhost:8088/api/"  //deploied
  //hostaddress2 = "http://10.0.0.2:8088/api/"  //deploied
  //hostaddress2 = "http://10.0.0.2:8082/api/"  //deploied

  ////#working on deploy
  //hostaddress2 = "http://localhost:8082/api/"  //deploied

  ///working
  //hostaddress2 = "http://192.168.10.100:8082/api/"  //deploied


 // hostaddress2 = "http://192.168.10.100:8091/api/"  //deploied 11-5


  //hostaddress2 = "http://10.0.0.200/Assets/api/"  //deploied


  //hostaddress2 = "http://localhost:8081/api/"




   hostaddress2 = "https://localhost:44310/api/"  //local 11-7
//  hostaddress2 = "http://192.168.10.26:8086/api/"    //11-7 DEPLOY  88  pmmp ARAMCO
 //  hostaddress2 = "http://192.168.10.17:8055/api/"    //11-7 DEPLOY  88  LABbACK

  //  hostaddress2 = "http://192.168.10.17:8070/api/"    //11-7 DEPLOY  88  MacBack



  //gishost = "http://192.168.10.201/"  //local 11-5
   gishost = "http://localhost:6080/"

  ///////////////////////////
  ///
  // hostaddress2 = "http://10.0.0.87:8088/api/"
  //  hostaddress2 = "http://10.0.0.13:8088/api/"
  //  hostaddress2 = "https://localhost:44310/api/"
  // ReportsHost = "http://10.0.0.87:8095/"
  // ReportsHost = "http://10.0.0.2:8095/"     //check

  //ReportsHost = "http://192.168.10.100:8095/"     //check

 // ReportsHost = "http://localhost:8084/" labTop
  //ReportsHost = "http://localhost:34199/"     //report  local
   //ReportsHost = "http://192.168.10.26:8092/"     //dammam reports
   //ReportsHost = "http://192.168.10.6/"     //aramco reports
     ReportsHost = "http://192.168.10.3:8060/"     //dammam arabic

  // hostaddress = "https://localhost:44310/api/"


  //hostaddress2 = "https://localhost:44310/api/"

  //hostaddress = "https://10.0.0.2:8088/api/"
  //hostaddress = "http://10.0.0.2:8088/api/"

  hostaddress = this.hostaddress2

  AssetsLayer = {
    // url:"../../assets/data/map1.geojson" ,
  //  url: this.gishost + "arcgis/rest/services/PMMS/PMMS01/MapServer/1",
    url: "http://localhost:6080/arcgis/rest/services/PMMS/PMMS01/MapServer/0",

      //  url: "http://196.221.208.107/arcserver/rest/services/PMMS/PMMS01/MapServer/1",

    renderer: {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: [255, 128, 0, 0.5],
        outline: {
          // autocasts as new SimpleLineSymbol()
          width: 1,
          color: "white",
        },
      },
    },
  };

  PCI = {
    RegionSecondaryStPCI: {
      CalculateRegionSecondaryStreetsPCI:
        "/PCI/RegionSecondaryStPCI/CalculateRegionSecondaryStreetsPCI",
    },

    PCIclaculate: {
      CalculateMainStreetSectionsPCI: this.hostaddress + "PCI/SectionsPCI/CalculateMainStreetSectionsPCI",
      RegionSecondaryStreetsPCI_ByDistrict: this.hostaddress + "PCI/RegionSecondaryStPCI/RegionSecondaryStreetsPCI_ByDistrict",
      RegionSecondaryStreetsPCI_ByMunicipality: this.hostaddress + "PCI/RegionSecondaryStPCI/RegionSecondaryStreetsPCI_ByMunicipality",
      CalculateRegionSecondaryStreetsPCI: this.hostaddress + "PCI/RegionSecondaryStPCI/CalculateRegionSecondaryStreetsPCI",
      CalculateMainStreetIntersectionsPCI: this.hostaddress + "pci/IntersectionPCI/CalculateMainStreetIntersectionsPCI",
      GetMainStreetsHavingSurveyDistresses: this.hostaddress + "pci/MainStreetPCI/GetMainStreetsHavingSurveyDistresses",
      GetSurveyedMunicipalities: this.hostaddress + "pci/RegionPCI/GetSurveyedMunicipalities",
      GetSurveyedDistricts: this.hostaddress + "pci/RegionPCI/GetSurveyedDistricts",
      GetSurveyedRegions: this.hostaddress + "pci/RegionPCI/GetSurveyedRegions",
      GetAvailableSurveys: this.hostaddress + "pci/DistressSurveyPCI/GetAvailableSurveys",

    },

  };
  MD = {
    RegionSecondaryStPCI: {
      CalculateRegionSecondaryStreetsPCI:
        "/PCI/RegionSecondaryStPCI/CalculateRegionSecondaryStreetsPCI",
    },

    MDclaculate: {
      GetAvailableSurveys: this.hostaddress + "pci/DistressSurveyPCI/GetAvailableSurveys",

      CalculateMainStreetSectionsPCI: this.hostaddress + "pci/sectionspci/CalculateMainStreetSectionsPCI",

      RegionSecondaryStreetsPCI_ByDistrict: this.hostaddress + "PCI/RegionSecondaryStPCI/RegionSecondaryStreetsPCI_ByDistrict",

      RegionSecondaryStreetsPCI_ByMunicipality: this.hostaddress + "PCI/RegionSecondaryStPCI/RegionSecondaryStreetsPCI_ByMunicipality",


      CalculateRegionSecondaryStreetsPCI: this.hostaddress + "PCI/RegionSecondaryStPCI/CalculateRegionSecondaryStreetsPCI",

      CalculateMainStreetIntersectionsPCI: this.hostaddress + "pci/IntersectionPCI/CalculateMainStreetIntersectionsPCI",

      GetMainStreetsHavingSurveyDistresses: this.hostaddress + "pci/MainStreetPCI/GetMainStreetsHavingSurveyDistresses",

      GetSurveyedMunicipalities: this.hostaddress + "pci/RegionPCI/GetSurveyedMunicipalities",
      GetSurveyedRegions: this.hostaddress + "pci/RegionPCI/GetSurveyedDistricts",
      GetSurveyedDistricts: this.hostaddress + "pci/RegionPCI/GetSurveyedDistricts",


    },

  };



  IRI = {
    MainStreetPCI: {

      GetStreetsIRI(): Observable<any> {
        return this.httpClient.get("http://10.0.0.20/Assets/api/PCI/MainStreetPCI/GetStreetsIRI");
      },
      GetStreetsSectionsLengthBySurvey2url:
        this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsLengthBySurvey?",
      GetStreetsInfo:
        this.hostaddress + "PCI/MainStreetPCI/GetStreetsInfo?",

      GetStreetsSectionsBySurvey:
        this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsBySurvey?",
      get_MD_MainStreetSections:
        this.hostaddress + "PCI/MaintenanceDecisionsPCI/get_MD_MainStreetSections",

      get_MD_SecondaryStByRegion:
        this.hostaddress + "PCI/MaintenanceDecisionsPCI/get_MD_SecondaryStByRegion",
      get_MD_MainStreetInterSections:
        this.hostaddress + "PCI/MaintenanceDecisionsPCI/get_MD_MainStreetInterSections",
      get_MD_SecondaryStByDistrict:
        this.hostaddress + "PCI/MaintenanceDecisionsPCI/get_MD_SecondaryStByDistrict",
      get_MD_SecondaryStByMunicipality:
        this.hostaddress + "PCI/MaintenanceDecisionsPCI/get_MD_SecondaryStByMunicipality",

    },

    Equipmentone: {
      GetStreetsIRI: this.hostaddress + "PCI/MainStreetPCI/GetStreetsIRI",
      GetAvailableSurveys: this.hostaddress + "PCI/DistressSurveyPCI/GetAvailableSurveys",
      GetStreetsInfo: this.hostaddress + "PCI/MainStreetPCI/GetStreetsInfo",
      GetStreetsSections: this.hostaddress + "PCI/MainStreetPCI/GetStreetsSections",
      GetStreetsSectionsLengthBySurvey: this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsLengthBySurvey?",
      GetStreetsSectionsBySurvey: this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsBySurvey",
      GetStreetsInfoBySurvey: this.hostaddress + "PCI/MainStreetPCI/GetStreetsInfoBySurvey"

    },
    EquipmentTwo: {
      GetMainStreetsHavingSurveyDistressesequ2: this.hostaddress + "PCI/MainStreetPCI/GetMainStreetsHavingSurveyDistresses",

      GetAvailableSurveyse1u2: this.hostaddress + "PCI/DistressSurveyPCI/GetAvailableSurveys",
      GetStreetsInfoequ2: this.hostaddress + "PCI/MainStreetPCI/GetStreetsInfo",
      GetStreetsInfoBySurveyequ2: this.hostaddress + "PCI/MainStreetPCI/GetStreetsInfoBySurvey",
      GetStreetsIRIequ2: this.hostaddress + "PCI/MainStreetPCI/GetStreetsIRI",
      GetStreetsSectionsLengthequ2: this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsLength",

      GetStreetsSectionsLengthBySurveyequ2: this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsLengthBySurvey",
      GetStreetsSectionsLengtErorrequ2: this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsLengtErorr",
    },
    EquipmentEight: {
      GetMainStreetsHavingSurveyDistresses: this.hostaddress + "PCI/MainStreetPCI/GetMainStreetsHavingSurveyDistresses",
      GetAvailableSurveys: this.hostaddress + "PCI/DistressSurveyPCI/GetAvailableSurveys",
      GetStreetsDDF: this.hostaddress + "PCI/MainStreetPCI/GetStreetsDDF",
      GetStreetsInfoDDF: this.hostaddress + "PCI/MainStreetPCI/GetStreetsInfoDDF",


      GetStreetsInfoBySurvey: this.hostaddress + "PCI/MainStreetPCI/GetStreetsInfoBySurvey",
      GetStreetsSectionsLengthBySurvey: this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsLengthBySurvey",
      GetStreetsSectionsBySurvey: this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsBySurvey",
      GetStreetsSectionsLengthDDFCLEAN: this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsLengthDDFCLEAN",

    },
    LaneSectionsErorrs: {
      GetErorrSectionLane: this.hostaddress + "PCI/MainStreetPCI/GetErorrSectionLane",
      UpdateStreetsUpdateErorrIRI: this.hostaddress + "PCI/DistressSurveyPCI/UpdateStreetsUpdateErorrIRI",
      GetSectionsErorrIRIDISTRESS: this.hostaddress + "PCI/MainStreetPCI/GetSectionsErorrIRIDISTRESS",

    },
    EquipmentLenth: {
      DrawFinshedStreetsMFV: this.hostaddress + "PCI/MainStreetPCI/DrawFinshedStreetsMFV",

    },
    RoadesUdi: {
      RoadsUdi: this.hostaddress + "PCI/MainStreetPCI/RoadsUdi",

    },
    DeletedSamples: {
      DeletedSamples: this.hostaddress + "PCI/MainStreetPCI/GetStreetsDeltedSamples",


    },
    EquipmentSectionsDetails: {
      GetSectionsDetailsIRI_byST: this.hostaddress + "PCI/MainStreetPCI/GetSectionsDetailsIRI_byST",
      GetSectionsDetailsIRI: this.hostaddress + "PCI/MainStreetPCI/GetSectionsDetailsIRI",
      GetSectionsDetailsNewIRI_St: this.hostaddress + "PCI/MainStreetPCI/GetSectionsDetailsNewIRI_St",
      GetSectionsDetailsNewIRI: this.hostaddress + "PCI/MainStreetPCI/GetSectionsDetailsNewIRI",
      GetSectionsDetailsSYS_ST: this.hostaddress + "PCI/MainStreetPCI/GetSectionsDetailsSYS_ST",
      GetSectionsDetailsSYS: this.hostaddress + "PCI/MainStreetPCI/GetSectionsDetailsSYS",



    }
    ,
    equipmentfourteen: {
      GetFinshedSTREETSQC: this.hostaddress + "PCI/MainStreetPCI/GetFinshedSTREETSQC",
      GetMainStreetsHavingSurveyDistresses: this.hostaddress + "PCI/MainStreetPCI/GetMainStreetsHavingSurveyDistresses",
      GetAvailableSurveys: this.hostaddress + "PCI/MainStreetPCI/GetAvailableSurveys",
      GetStreetsInfoBySurvey: this.hostaddress + "PCI/MainStreetPCI/GetStreetsInfoBySurvey",
      GetStreetsInfoDDF: this.hostaddress + "PCI/MainStreetPCI/GetStreetsInfoDDF",
      GetStreetsSectionsLengthBySurvey: this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsLengthBySurvey",
      GetStreetsSectionsLength: this.hostaddress + "PCI/MainStreetPCI/GetStreetsSectionsLength",



    },
    EquipmentValidateIRI: {
      ValidateIRI: this.hostaddress + "PCI/MainStreetPCI/ValidateIRI",
      ValidateGPR: this.hostaddress + "PCI/MainStreetPCI/ValidateGPR",
      ValidateFWD: this.hostaddress + "PCI/MainStreetPCI/ValidateFWD",
      ValidateSKID: this.hostaddress + "PCI/MainStreetPCI/ValidateSKID",


    }
  };
  Settings = {
    GetMdSettings: this.hostaddress2 + "pci/Md_Settings/GetMdSettings",
    GetMAINT_DECISIONS_PCI: this.hostaddress2 + "pci/Md_Settings/GetMAINT_DECISIONS_PCI",
    UpdateMdSettings: this.hostaddress2 + "pci/Md_Settings/UpdateMdSettings",
    GetMAINT_DECIDING2: this.hostaddress2 + "pci/Md_Settings/GetMAINT_DECIDING2",
    GetDIST_CODE: this.hostaddress2 + "pci/Md_Settings/GetDIST_CODE",
    UpdateMAINT_DECIDING2: this.hostaddress2 + "pci/Md_Settings/UpdateMAINT_DECIDING2",
    GetMAINT_DECIDING2_SWALK: this.hostaddress2 + "pci/Md_Settings/GetMAINT_DECIDING2_SWALK",

  };
  Budget = {
    InsertPL_BUDGET: this.hostaddress2 + "pci/BudgetPlanning/InsertPL_BUDGET",
    Get_PL_Planning_Sections: this.hostaddress2 + "pci/BudgetPlanning/Get_PL_Planning_Sections",
    PL_Planning_Sections_Calc: this.hostaddress2 + "pci/BudgetPlanning/PL_Planning_Sections_Calc",
    PL_Planning_INTERSECTION_Calc: this.hostaddress2 + "pci/BudgetPlanning/PL_Planning_INTERSECTION_Calc",
    GetPlINTERSECTIONS2: this.hostaddress2 + "pci/BudgetPlanning/GetPlINTERSECTIONS2",
    PL_Planning_Regions_Calc: this.hostaddress2 + "pci/BudgetPlanning/PL_Planning_Regions_Calc",
    GetPlRegions: this.hostaddress2 + "pci/BudgetPlanning/GetPlRegions",
    Get_Budget_data: this.hostaddress2 + "pci/BudgetPlanning/Get_Budget_data",

  };
  CONTRACTOR = {
    Get_Contractor: this.hostaddress2 + "pci/Contractor/Get_Contractor",
    InsertContractor: this.hostaddress2 + "pci/Contractor/InsertContractor",
    UpdateContractor: this.hostaddress2 + "pci/Contractor/UpdateContractor",
    DeleteCONTRACTOR: this.hostaddress2 + "pci/Contractor/Delete",

  };
  maps = {
    map1: "http://localhost:6080/arcgis/rest/services/PMMS/PMMS01/MapServer/1",
    map0: "http://localhost:6080/arcgis/rest/services/PMMS/PMMS01/MapServer/0",
    map3: "http://localhost:6080/arcgis/rest/services/PMMS/PMMS01/MapServer/2",


  };

   mapSetting = {

    mapCenter : [49.984360,26.399250],
    basemapType : "dark-gray-vector",
      mapZoomLevel :10
  };




  // mapSetting = {

  //   mapCenter : [49.984360,26.399250],
  //   basemapType : "dark-gray-vector",
  //     mapZoomLevel :10
  // };
}
