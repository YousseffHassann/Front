import {
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { AlertService } from "ngx-alerts";
//import { UploadFileService } from "../Services/upload-file.service";
//import { UploadFileService } from "../Services/upload-file.service";
import { MatDialog } from "@angular/material/dialog";
import { LanesPopUpComponent } from "./lanes-pop-up/lanes-pop-up.component";
import { UploadFileService } from "../../Services/upload-file.service";
import { Console } from "console";
import { InconsistentSectionsComponent } from "./inconsistent-sections/inconsistent-sections.component";
import { AssetsSettingsService } from "../../AssetsMangement/assets-settings.service";
import { DomSanitizer } from "@angular/platform-browser";
//import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "button-view",
  template: `
    <button (click)="onClick(renderValue)" class="smrttableButton">
      {{ renderValue }}
    </button>
  `,
  styleUrls: ["./upload-file.component.scss"],
})
@Injectable({
  providedIn: "root",
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  accessfileMAP;
  actualLanes;

  constructor(
    private sectionService: UploadFileService,
    private upfileComponent: UploadFileComponent,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
    this.accessfileMAP = this.upfileComponent.accessfileMAP;
    console.log(this.accessfileMAP);
    console.log("***************ssss");
    console.log(this.renderValue);
  }

  onClick(renderValue) {
    console.log("BUTTON");
    console.log(renderValue);
    this.sectionService.getactuallanesdata(renderValue).subscribe((res) => {
      console.log(res);
      this.actualLanes = res;
      this.openDialog();
    });

    console.log("******************************************");
    console.log("******************************************");
    console.log("******************************************");
    console.log("******************************************");
    console.log(typeof renderValue);
    console.log(this.accessfileMAP.get(renderValue));
    console.log(this.upfileComponent.filename);
    console.log(this.upfileComponent.surveyNumber);
  }

  openDialog() {
    this.dialog.open(LanesPopUpComponent, {
      data: {
        actualLanes: this.actualLanes,
        accessfileMAP: this.accessfileMAP,
        sectionNo: this.renderValue,
      },
      width: "50rem",
    });
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: "ngx-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.scss"],
})
export class UploadFileComponent implements OnInit {
  //ALL VARIABLES
  ALLDATA: any;
  surveyNumber: any;
  currentInput: any;
  result: any[] = [];
  resultShow: boolean = false;
  filename: any;
  thefile: any;
  UploadBtn: boolean = false;
  /////////////////////////////////////////
  selectedFile: File;
  currentInput3: any;
  result3: any[] = [];
  resultShow3: boolean = false;
  AfterUploaded: boolean = false;
  thereisfilechoosen: boolean = false;
  //////////////////////////////////////////
  selectedrecords: any[];
  //////////////////////////////////////////
  Sections: string;

  tmpobj: {};
  seccalccompleted: boolean = false;
  samplecalccompleted: boolean = false;
  lanecalccompleted: boolean = false;
  surveycompleted: boolean = false;

  submitbuttonpressed: boolean = false;
  accessfileMAP = new Map<any, any>();
  streetName: any;
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  allsectionsinfile = [];
  allsectionstr = "";

  constructor(
    private sectionService: UploadFileService,
    private alertService: AlertService,
    private renderer2: Renderer2,
    private e: ElementRef,
    private dialog: MatDialog,
    private assetSettingsService: AssetsSettingsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    //this.surveyNumber = this.appComponent.loginInfo.get("surveynumber");
    //let allcookies=this.cookie.getAll();
    //console.log(allcookies)
    this.surveyNumber = localStorage.getItem("surveynumber");
    console.log(this.surveyNumber);
    console.log(this.surveyNumber);
    // console.log(this.appComponent.loginInfo.get("username"));
    // console.log(this.appComponent.loginInfo)
    // console.log(this.lanecalccompleted)
  }

  //This functions is for disabling the check box where consist lanes are equal to 0
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  CHECKBOXDISABLE() {
    /* You can call this with a timeOut because if you don't you'll only see one checkbox... the other checkboxes take some time to render and appear, which is why we wait for it */
    setTimeout(() => {
      this.disableCheckboxes();
    }, 2000);
  }

  disableCheckboxes() {
    var checkbox = this.e.nativeElement.querySelectorAll(
      "input[type=checkbox]"
    );
    checkbox.forEach((element, index) => {
      if (index == 0) {
        this.renderer2.setAttribute(element, "disabled", "true");
      }
      if (index > 0 && this.ALLDATA[index - 1].CONSIST_LANES == "0") {
        this.renderer2.setAttribute(element, "disabled", "true");
      }
    });
  }
  //End of the disabling check box functions
  ///////////////////////////////////////////////////////////////////////////////////////

  onFileSelected(event) {
    console.log(event.target.files);
    // this.currentInput = event.target.files[0].FileList;
    console.log(event.target.files[0].name);
    this.filename = event.target.files[0].name;
    this.thefile = event.target.files[0];

    console.log(this.currentInput);
    console.log(typeof this.currentInput);
    this.sectionService
      .UploadFile(event.target.files[0].name, this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        this.result = res;
        this.source1.load(res);
        this.resultShow = true;
      });
    console.log(this.currentInput);
  }

  settings1 = {
    mode: "external",
    hideSubHeader: true,
    actions: {
      delete: false,
      edit: false,
      add: false,
      position: "right",
    },

    columns: {
      TableName: {
        title: "Table Name",
        type: "string",
      },
      TableRows: {
        title: "Number of Records",
        type: "number",
      },
    },
  };
  source1: LocalDataSource = new LocalDataSource();

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    console.log(fileToUpload);
    const formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    console.log(formData);
  };

  onFileSelected3(event): void {
    //8888888

    if (event.target.files[0] == undefined) {
      return;
    }
    this.seccalccompleted = false;
    this.samplecalccompleted = false;
    this.lanecalccompleted = false;
    this.surveycompleted = false;
    this.inConsistSectionsFound = false;

    this.AfterUploaded = false;
    this.resultShow = false;
    this.submitbuttonpressed = false;
    this.thereisfilechoosen = true;
    this.sourceTab1 = new LocalDataSource();
    this.sourceTab2 = new LocalDataSource();
    this.sourceTab3 = new LocalDataSource();
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    console.log(event.target.files[0].name);
    console.log(this.filename);

    this.filename = event.target.files[0].name;
    console.log(this.currentInput);
    console.log(this.filename);
  }

  allowUpload = true;
  onUpload(): void {
    this.seccalccompleted = false;
    this.samplecalccompleted = false;
    this.lanecalccompleted = false;
    this.surveycompleted = false;
    this.inConsistSectionsFound = false;

    this.AfterUploaded = false;
    this.resultShow = false;
    this.submitbuttonpressed = false;
    this.thereisfilechoosen = true;

    this.sectionService.ChechMDRefreshStatus().subscribe((res) => {
      this.allowUpload = res;
      console.log(this.allowUpload);
      if (this.allowUpload == false) {
        return;
      }
      this.inConsistSectionsFound = false;
      this.AfterUploaded = true;
      this.allsectionsinfile = [];
      this.allsectionstr = "";
      console.log(this.filename);
      console.log(this.selectedFile);
      console.log(this.selectedFile.name);
      this.UploadBtn = true;
      const formData = new FormData();
      formData.append("file", this.selectedFile, this.selectedFile.name);
      formData.append("SURVEY_NO", this.surveyNumber.toString());
      localStorage.setItem("FileName", this.filename);

      //this.sectionService.UploadFile2(formData).subscribe((res) => {
      // console.log(res);
      this.sectionService
        .UploadFile(this.filename, this.surveyNumber)
        .subscribe((res) => {
          console.log("MMMMMMMM");
          //First Smart Table (Surveys Table)
          console.log(res);
          this.result = res;
          this.source1.load(res);
          this.resultShow = true;
          this.getallserveys();
          this.sectionService
            .getaccessfilelanesdata(this.filename, this.surveyNumber)
            .subscribe((res) => {
              console.log(res);
              res.forEach((element) => {
                console.log(element);
                if (
                  this.accessfileMAP.get(element["SECTION_NO"]) == undefined
                ) {
                  this.accessfileMAP.set(element["SECTION_NO"], [
                    {
                      LANE_LENGTH: element["LANE_LENGTH"],
                      LANE_WIDTH: element["LANE_WIDTH"],
                      LANE: element["LANE"],
                    },
                  ]);
                } else {
                  this.accessfileMAP.get(element["SECTION_NO"])!.push({
                    LANE_LENGTH: element["LANE_LENGTH"],
                    LANE_WIDTH: element["LANE_WIDTH"],
                    LANE: element["LANE"],
                  });
                }
              });
              console.log(this.accessfileMAP);
              //this.accessfileMAP.set()
              this.getSectionsInAccessAndNotInSectionsTable();
              this.getSectionsWhereConsistLanesEqualZero();
            });
        });
    });
    //});
    //this.CHECKBOXDISABLE();

    ////////////////////////////

    ///////////////////////////////
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  // SURVEYS SMART TABLE

  source: LocalDataSource = new LocalDataSource();

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 20,
    },
    selectMode: "multi",
    actions: {
      delete: false,
      add: false,
      edit: false,
      select: true,
    },
    rowClassFunction: (row: any) => {
      if (row.data.CONSIST_LANES == "0") {
        return "red";
      }
      // else {
      //   return 'green'
      // }
    },
    columns: {
      SECTION_NO: {
        title: "Section Number",
        type: "custom",
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe((row) => {});
        },
      },
      FILE_NAME: {
        title: "File Name",
        type: "string",
      },

      LANES_SURV: {
        title: "Lanes Survey",
        type: "string",
      },
      LANES_SYS: {
        title: "Lanes System",
        type: "string",
      },
      SECTION_LENGTH: {
        title: "Sections Length",
        type: "string",
      },
      SECTION_WIDTH: {
        title: "Section Width",
        type: "string",
      },
    },
  };

  // END OF SURVEY SMART TABLE
  ///////////////////////////////////////////////////////////////////////////////////////////////

  getallserveys() {
    this.sectionService
      .getallsurveys(this.filename, this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        this.ALLDATA = res;
        try {
          this.source.load(res);
          res.forEach((element) => {
            this.allsectionsinfile.push(element.SECTION_NO);
          });
          console.log(this.allsectionsinfile);
          if (this.allsectionstr.length == 0) {
            this.allsectionsinfile.forEach((element) => {
              this.allsectionstr += element + ",";
            });
            this.allsectionstr = this.allsectionstr.substring(
              0,
              this.allsectionstr.length - 1
            );
          }
        } catch {
          this.source = new LocalDataSource();
        }
        this.surveycompleted = true;
        // this.sectionService.getaccessfilestreet().subscribe((res)=>{
        //   console.log(res);
        //   console.log("NEWNEWNEWNEWNEWNEWNEWNENWENWNEW")
        //   console.log(this.allsectionstr)
        //   this.streetName=res[0]['ARNAME']
        //   console.log(this.streetName)
        // })
      });
  }

  onUserRowSelect(event) {
    console.log(event);
    this.selectedrecords = event.selected;
  }

  onSubmit() {
    this.sectionService.ChechMDRefreshStatus().subscribe((res) => {
      this.allowUpload = res;
      console.log(this.allowUpload);
      if (this.allowUpload == false) {
        return;
      }
      this.seccalccompleted = false;
      this.samplecalccompleted = false;
      this.lanecalccompleted = false;
      this.submitbuttonpressed = true;
      //let selectedSectionNo: string[];
      this.Sections = "";
      try {
        console.log(this.selectedrecords);
        this.selectedrecords.forEach((element) => {
          console.log(element.SECTION_NO);
          this.Sections += element.SECTION_NO + ",";
          //selectedSectionNo.push(element.SECTION_NO);
        });
        this.Sections = this.Sections.substring(0, this.Sections.length - 1);
        console.log(this.Sections);
        //console.log(selectedSectionNo);
        this.tmpobj = {
          FileName: this.filename,
          SURVEY_NO: this.surveyNumber.toString(),
          Sections: this.Sections,
        };
        console.log(this.tmpobj);
        this.sectionService.submitdata(this.tmpobj).subscribe((res) => {
          console.log(res);
          this.alertService.success("Survey Completed");
          this.alertService.info("Calculating PCI");
          this.sectionService
            .PCIcalculations(this.surveyNumber)
            .subscribe((res) => {
              console.log(res);
              if (res == true) {
                this.alertService.success("Calculation Completed");
              } else {
                this.alertService.warning("Calculations Failed");
              }
              this.getselectedsectionscalc();
              this.getselectedsectionsamplecalc();
              this.getselectedlanesscalc();
              this.GetSelectedSectionsPCIDistress();
              this.GetSelectedSectionsPCIIRI();
              this.getallserveys();
              this.seccalccompleted = true;
              this.samplecalccompleted = true;
              this.lanecalccompleted = true;
            });
        });
      } catch {
        this.getallserveys();
        this.seccalccompleted = true;
        this.samplecalccompleted = true;
        this.lanecalccompleted = true;
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // TAB1 SMART TABLE SETTINGS
  settingsTab1 = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 7,
    },
    //selectMode: 'multi',
    actions: {
      delete: false,
      add: false,
      edit: false,
      select: true,
    },
    columns: {
      SECTION_NO: {
        title: "Section Number",
        type: "string",
      },
      LANE_TYPE: {
        title: "Lane Type",
        type: "string",
      },
      PCI_VALUE: {
        title: "PCI Value",
        type: "number",
      },
      NO_OF_SAMPLES: {
        title: "Number Of Samples",
        type: "number",
      },
      PCI_RATE: {
        title: "PCI Rate",
        type: "string",
      },
    },
  };

  sourceTab1: LocalDataSource = new LocalDataSource();

  getselectedlanesscalc() {
    console.log("****************************");
    console.log(this.Sections);
    this.sectionService
      .getselectedlanescalc(this.allsectionstr, +this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        this.sourceTab1.load(res);
        this.lanecalccompleted = true;
      });
  }

  // TAB1 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // TAB2 SMART TABLE SETTINGS
  settingsTab2 = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 7,
    },
    //selectMode: 'multi',
    actions: {
      delete: false,
      add: false,
      edit: false,
      select: true,
    },
    columns: {
      SECTION_NO: {
        title: "Section Number",
        type: "string",
      },
      LANE_TYPE: {
        title: "Lane Type",
        type: "string",
      },
      PCI_VALUE: {
        title: "PCI Value",
        type: "number",
      },
      SAMPLE_NO: {
        title: "Sample Number",
        type: "number",
      },
      PCI_RATE: {
        title: "PCI Rate",
        type: "string",
      },
    },
  };

  sourceTab2: LocalDataSource = new LocalDataSource();

  getselectedsectionsamplecalc() {
    this.sectionService
      .getselectedsamplescalc(this.allsectionstr, +this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        this.sourceTab2.load(res);
        this.samplecalccompleted = true;
      });
  }

  // TAB2 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // TAB3 SMART TABLE SETTINGS
  settingsTab3 = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 7,
    },
    //selectMode: 'multi',
    actions: {
      delete: false,
      add: false,
      edit: false,
      select: true,
    },
    columns: {
      SECTION_NO: {
        title: "Section Number",
        type: "string",
      },
      // LANE_TYPE: {
      //   title: 'Lane Type',
      //   type: 'string',
      // },
      NO_OF_LANES: {
        title: "Number Of Lanes",
        type: "number",
      },
      SECTION_AREA: {
        title: "Section Area",
        type: "number",
      },
      PCI_VALUE: {
        title: "PCI Value",
        type: "number",
      },
      PCI_RATE: {
        title: "PCI Rate",
        type: "string",
      },
    },
  };

  sourceTab3: LocalDataSource = new LocalDataSource();

  getselectedsectionscalc() {
    this.sectionService
      .getselectedsectionscalc(this.allsectionstr, +this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        this.sourceTab3.load(res);
        this.seccalccompleted = true;
      });
  }

  // TAB3 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////

  inConsistSectionsFound = false;

  inConsistantSections() {
    this.dialog.open(InconsistentSectionsComponent, {
      data: {
        filename: this.filename,
      },
      width: "50rem",
    });
  }

  getSectionsInAccessAndNotInSectionsTable() {
    this.sectionService
      .getSectionsInAccessAndNotInSectionsTable(this.filename.slice(0, 6))
      .subscribe((res) => {
        console.log(res);
        if (res.length != 0) {
          this.inConsistSectionsFound = true;
        }
      });
  }

  getSectionsWhereConsistLanesEqualZero() {
    this.sectionService
      .getSectionsWhereConsistLanesEqualZero(this.filename, this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        if (res.length != 0) {
          this.inConsistSectionsFound = true;
        }
      });
  }

  ///////////////////////////////////////////////////////////////
  // TAB4 SMART TABLE SETTINGS
  settingsTab4 = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 7,
    },
    //selectMode: 'multi',
    actions: {
      delete: false,
      add: false,
      edit: false,
      select: true,
    },
    columns: {
      SECTION_NO: {
        title: "Section Number",
        type: "string",
      },
      SAMPLE_NO: {
        title: "Sample Number",
        type: "number",
      },
      DISTRESS_EN_TYPE: {
        title: "Distress Type",
        type: "string",
      },
      DIST_SEVERITY: {
        title: "Distress Severity",
        type: "string",
      },
      DIST_DENSITY: {
        title: "Distress Density",
        type: "number",
      },
      DIST_AREA: {
        title: "Distress Area",
        type: "number",
      },
    },
  };

  sourceTab4: LocalDataSource = new LocalDataSource();

  GetSelectedSectionsPCIDistress() {
    this.sectionService
      .GetSelectedSectionsPCIDistress(this.allsectionstr, +this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        this.sourceTab4.load(res);
      });
  }

  // TAB4 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // TAB4 SMART TABLE SETTINGS (IRI)
  settingsTab5 = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 7,
    },
    //selectMode: 'multi',
    actions: {
      delete: false,
      add: false,
      edit: false,
      select: true,
    },
    columns: {
      MAIN_NO: {
        title: "Main Number",
        type: "string",
      },
      SECTION_NO: {
        title: "Section Number",
        type: "string",
      },
      SAMPLE_NO: {
        title: "Sample Number",
        type: "number",
      },
      LANE: {
        title: "Lane Type",
        type: "string",
      },
      IRI_NET2: {
        title: "IRI",
        type: "number",
      },
      SAMPLE_AREA: {
        title: "Sample Area",
        type: "number",
      },
    },
  };

  sourceTab5: LocalDataSource = new LocalDataSource();

  GetSelectedSectionsPCIIRI() {
    this.sectionService
      .GetSelectedSectionsPCIIRI(this.allsectionstr, +this.surveyNumber)
      .subscribe((res) => {
        console.log(res);
        this.sourceTab5.load(res);
      });
  }

  // TAB4 SMART TABLE SETTINGS
  ///////////////////////////////////////////////////////////////

  showReport() {
    console.log("SAFCDSVA");
    this.showReportBool = true;
    this.reportLink =
      this.assetSettingsService.ReportsHost +
      "SamplesDistresses.aspx?rname=SamplesDistresses&module=pci" +
      `&selectedsections=${this.allsectionstr}&surveynumber=${+this
        .surveyNumber}`;
    this.safeReportLink = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.reportLink
    );
  }

  reportLink: string;
  safeReportLink: any;
  showReportBool = false;

  downloadDistressesReport() {
    const link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.setAttribute("href", this.reportLink + "&type=x");
    link.setAttribute("download", `Distresses-Report.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
