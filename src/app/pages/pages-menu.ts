import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: "E-commerce",
  //   icon: "shopping-cart-outline",
  //   link: "/pages/dashboard",
  //   home: true,
  // },
  // {
  //   title: "IoT Dashboard",
  //   icon: "home-outline",
  //   link: "/pages/iot-dashboard",
  // },
  // {
  //   title: "FEATURES",
  //   group: true,
  // },
  // {
  //   title: "Layout",
  //   icon: "layout-outline",
  //   children: [
  //     {
  //       title: "Stepper",
  //       link: "/pages/layout/stepper",
  //     },
  //     {
  //       title: "List",
  //       link: "/pages/layout/list",
  //     },
  //     {
  //       title: "Infinite List",
  //       link: "/pages/layout/infinite-list",
  //     },
  //     {
  //       title: "Accordion",
  //       link: "/pages/layout/accordion",
  //     },
  //     {
  //       title: "Tabs",
  //       pathMatch: "prefix",
  //       link: "/pages/layout/tabs",
  //     },
  //   ],
  // },
  // {
  //   title: "Forms",
  //   icon: "edit-2-outline",
  //   children: [
  //     {
  //       title: "Form Inputs",
  //       link: "/pages/forms/inputs",
  //     },
  //     {
  //       title: "Form Layouts",
  //       link: "/pages/forms/layouts",
  //     },
  //     {
  //       title: "Buttons",
  //       link: "/pages/forms/buttons",
  //     },
  //     {
  //       title: "Datepicker",
  //       link: "/pages/forms/datepicker",
  //     },
  //   ],
  // },
  {
    title: "إدارة الأصول",
    icon: "edit-2-outline",
    children: [
      {
        title: "المستخدمين",
        link: "/pages/assets-management/user",
        children: [
          {
            title: "إنشاء حساب",
            link: "/pages/assets-management/user/createAccount",
          },
          {
            title: "تسجيل الدخول",
            link: "/pages/assets-management/user/login",
          },
          {
            title: " Welcome",
            link: "/pages/assets-management/Welcome",
          },
          // {
          //   title: "إدارة الحسابات",
          //   link: "/pages/assets-management/user/ManageAccounts",
          // },
        ],
      },
      {
        title: "PMMS",
        link: "/pages/assets-management/PMMS",
        children: [

          {
            title: "إعدادات النظام",

            children: [
              {
                title: "اعدادت تعميم قرارات الصيانة (4-36)",
                link: "/pages/assets-management/generalsettings",
              }
              ,
              {
                title: "اعدادت قرارات الصيانة للعيوب",
                link: "/pages/assets-management/maintdeciding",
              },
              {
                title: "اعدادت قرارات الصيانة لعيوب الأرصفة ",
                link: "/pages/assets-management/maintdeciding2swalk",
              }
            ],
          },
          {
            title: "تحليل النظام",
            children: [
              // {
              //   title: "مقارنة العيوب مع حاله الوعورة  DDF - IRI ",
              //   link: "/pages/assets-management/EquipmentEight",
              // },
              {
                title: "تفاصيل الشوارع الرئيسية المعده ",
                link: "/pages/assets-management/EquipmentSectionsDetails",

              },
              {
                title: " بيانات العينات المحذوفه ومدخل عليها عيوب ",
                link: "/pages/assets-management/DeletedSamples",
              },


              {
                title: "إستوائية رصف الطريق مقاطع IRI ",
                link: "/pages/assets-management/equipmentone",
              }
              ,

              // {
              //   title: "مقارنة اطوال المعده والنظام IRI ",
              //   link: "/pages/assets-management/EquipmentTwo",
              // },
              {
                title: "حارات مربوطة خطأ بالمقاطع",
                link: "/pages/assets-management/LaneSectionsErorrs",
              },
              //  {
              //   title: "اطوال شوارع الرسم ",
              //   link: "/pages/assets-management/EquipmentLenth",
              // },
              {
                title: " تفاصيل حالة الشوارع  ",
                link: "/pages/assets-management/RoadesUdi",
              },
              // {
              //   title: " مراجعة أطوال المعده والنظام ",
              //   link: "/pages/assets-management/equipment-fourteen",
              // },
              {
                title: " حارات بالمعدة وغير موجودة بالنظام  IRI",
                link: "/pages/assets-management/equipment-validate-iri",
              }, {
                title: " حارات بالمعدة وغير موجودة بالنظام  FWD",
                link: "/pages/assets-management/equipment-validate-fwd",
              },
              {
                title: " حارات بالمعدة وغير موجودة بالنظام  SKID",
                link: "/pages/assets-management/equipment-validate-skid",
              }, {
                title: " حارات بالمعدة وغير موجودة بالنظام  GPR",
                link: "/pages/assets-management/equipment-validate-gpr",
              },
            ],
          },
          //updated
          {
            title: " الاحصائيات",
            children: [
              {
                title: "  احصائيات العيوب ",
                //link: "PMMS/mycharts/mycharts",
                //link: "/pages/mychart",
                link: "/pages/charts/chartjs",
              },
              {
                title: "   احصائيات التكلفة  ",
                //link: "PMMS/mycharts/mycharts",
                //link: "/pages/mychart",
                link: "/pages/charts/echarts",
              },
              {
                title: "   اضافة صلاحية   ",
                //link: "PMMS/mycharts/mycharts",
                //link: "/pages/mychart",
                link: "/pages/sec_roles",
              },
              {
                title: "   اضافة مستخدم   ",
                //link: "PMMS/mycharts/mycharts",
                //link: "/pages/mychart",
                link: "/pages/adduser",
              },

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
            title: "حسابات حالة الرصف",
            link: "/pages/assets-management/PMMS",
          },
          {
            title: "قرارت الصيانه",
            link: "/pages/assets-management/PMMSMD",
          },
          {
            title: "خطط الصيانه",
            children: [
              {
                title: "الخطة والموازنة",
                link: "/pages/assets-management/PLanning",
              }

            ],
          },
          {
            title: "  المقاولين والعقود",
            children: [
              {
                title: "  المقاولين",
                link: "/pages/assets-management/Contractor",
              }

            ],
          },
          {
            title: "  التقارير ",
            children: [
              {
                title: "  PCI_InterSections",
                link: "/pages/assets-management/PCI_InterSections",
              }

            ],
          },

        ],


      },
      // {
      //   title: "الاصول",
      //   link: "/pages/assets-management/assets",
      // },
      // {
      //   title: "إحصاءات الأصول ",
      //   link: "/pages/assets-management/assets-charts",
      // },
      // {
      //   title: "احصائيات متقدمة",
      //   link: "/pages/assets-management/advanced-charts",
      // },
      // {
      //   title: "خريطة1",
      //   link: "/pages/assets-management/map1",
      // },
      // {
      //   title: "الخرائط",
      //   link: "/pages/assets-management/mapping",
      // },
    ],
  },
  // {
  //   title: "UI Features",
  //   icon: "keypad-outline",
  //   link: "/pages/ui-features",
  //   children: [
  //     {
  //       title: "Grid",
  //       link: "/pages/ui-features/grid",
  //     },
  //     {
  //       title: "Icons",
  //       link: "/pages/ui-features/icons",
  //     },
  //     {
  //       title: "Typography",
  //       link: "/pages/ui-features/typography",
  //     },
  //     {
  //       title: "Animated Searches",
  //       link: "/pages/ui-features/search-fields",
  //     },
  //   ],
  // },
  // {
  //   title: "Modal & Overlays",
  //   icon: "browser-outline",
  //   children: [
  //     {
  //       title: "Dialog",
  //       link: "/pages/modal-overlays/dialog",
  //     },
  //     {
  //       title: "Window",
  //       link: "/pages/modal-overlays/window",
  //     },
  //     {
  //       title: "Popover",
  //       link: "/pages/modal-overlays/popover",
  //     },
  //     {
  //       title: "Toastr",
  //       link: "/pages/modal-overlays/toastr",
  //     },
  //     {
  //       title: "Tooltip",
  //       link: "/pages/modal-overlays/tooltip",
  //     },
  //   ],
  // },
  // {
  //   title: "Extra Components",
  //   icon: "message-circle-outline",
  //   children: [
  //     {
  //       title: "Calendar",
  //       link: "/pages/extra-components/calendar",
  //     },
  //     {
  //       title: "Progress Bar",
  //       link: "/pages/extra-components/progress-bar",
  //     },
  //     {
  //       title: "Spinner",
  //       link: "/pages/extra-components/spinner",
  //     },
  //     {
  //       title: "Alert",
  //       link: "/pages/extra-components/alert",
  //     },
  //     {
  //       title: "Calendar Kit",
  //       link: "/pages/extra-components/calendar-kit",
  //     },
  //     {
  //       title: "Chat",
  //       link: "/pages/extra-components/chat",
  //     },
  //   ],
  // },
  // {
  //   title: "Maps",
  //   icon: "map-outline",
  //   children: [
  //     {
  //       title: "Google Maps",
  //       link: "/pages/maps/gmaps",
  //     },
  //     {
  //       title: "Leaflet Maps",
  //       link: "/pages/maps/leaflet",
  //     },
  //     {
  //       title: "Bubble Maps",
  //       link: "/pages/maps/bubble",
  //     },
  //     {
  //       title: "Search Maps",
  //       link: "/pages/maps/searchmap",
  //     },
  //   ],
  // },
  // {
  //   title: "Charts",
  //   icon: "pie-chart-outline",
  //   children: [
  //     {
  //       title: "Echarts",
  //       link: "/pages/charts/echarts",
  //     },
  //     {
  //       title: "Charts.js",
  //       link: "/pages/charts/chartjs",
  //     },
  //     {
  //       title: "D3",
  //       link: "/pages/charts/d3",
  //     },
  //   ],
  // },
  // {
  //   title: "Editors",
  //   icon: "text-outline",
  //   children: [
  //     {
  //       title: "TinyMCE",
  //       link: "/pages/editors/tinymce",
  //     },
  //     {
  //       title: "CKEditor",
  //       link: "/pages/editors/ckeditor",
  //     },
  //   ],
  // },
  // {
  //   title: "Tables & Data",
  //   icon: "grid-outline",
  //   children: [
  //     {
  //       title: "Smart Table",
  //       link: "/pages/tables/smart-table",
  //     },
  //     {
  //       title: "Tree Grid",
  //       link: "/pages/tables/tree-grid",
  //     },
  //   ],
  // },
  // {
  //   title: "Miscellaneous",
  //   icon: "shuffle-2-outline",
  //   children: [
  //     {
  //       title: "404",
  //       link: "/pages/miscellaneous/404",
  //     },
  //   ],
 // }
  {
    title: "Auth",
    icon: "lock-outline",
    children: [
      {
        title: "Login",
        link: "/login",
      },
      {
        title: "Register",
        link: "/auth/register",
      },
      {
        title: "Request Password",
        link: "/auth/request-password",
      },
      {
        title: "Reset Password",
        link: "/auth/reset-password",
      },
      {
        title: 'Print',
        link: '/print'
      },
    ],
  },

];
