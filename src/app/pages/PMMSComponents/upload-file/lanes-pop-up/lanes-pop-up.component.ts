import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ngx-lanes-pop-up',
  templateUrl: './lanes-pop-up.component.html',
  styleUrls: ['./lanes-pop-up.component.scss']
})
export class LanesPopUpComponent implements OnInit {

  actualLanes
  accessfileMAP
  sectionNo
  accessfileLaneLength
  accessfileLaneWidth
  actualLaneLength
  actualLaneWidth
  accessfiledata
  finalData = new Map<any, any>();
  finalArray=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data){
  }

  ngOnInit(): void {
    this.actualLanes=this.data.actualLanes
    this.accessfileMAP=this.data.accessfileMAP
    this.sectionNo=this.data.sectionNo
    console.log(this.actualLanes)
    console.log(this.accessfileMAP)
    console.log(this.sectionNo)
    console.log(typeof(this.sectionNo))
    this.accessfiledata=this.accessfileMAP.get(this.sectionNo)
    console.log(this.accessfiledata)
    this.accessfiledata.forEach(element => {
      console.log(element['LANE'])
      this.finalData.set(element['LANE'],[{FILENAME:"Access File(Survey)", LANE:element['LANE'], LANE_LENGTH: Math.round(element['LANE_LENGTH']) , LANE_WIDTH:Math.round(element['LANE_WIDTH'])}])
    });
    console.log(this.finalData)
    this.actualLanes.forEach(element => {
      try{this.finalData.get(element['LANE_TYPE'])!.push({FILENAME:"GIS", LANE:element['LANE_TYPE'], LANE_LENGTH: Math.round(element['LANE_LENGTH']) , LANE_WIDTH:Math.round(element['LANE_WIDTH'])})}
      catch{this.finalData.set(element['LANE_TYPE'],[{FILENAME:"GIS", LANE:element['LANE_TYPE'], LANE_LENGTH: Math.round(element['LANE_LENGTH']) , LANE_WIDTH:Math.round(element['LANE_WIDTH'])}])}
    });
    console.log(this.finalData)
    this.finalData.forEach(element => {
      console.log(element)
      element.forEach(element2 => {
        this.finalArray.push(element2)
      });
    });
    console.log(this.finalArray)
    console.log("*************************")
    console.log(this.actualLanes)
    this.accessfileLaneLength=this.accessfileMAP[0]
    this.accessfileLaneWidth=this.accessfileMAP[1]
    this.actualLaneLength=this.actualLanes[0].LANE_LENGTH
    this.actualLaneWidth=this.actualLanes[0].LANE_WIDTH
    console.log(this.accessfileLaneLength)
    console.log(this.accessfileLaneWidth)
    console.log(this.actualLaneLength)
    console.log(this.actualLaneWidth)
  }

}
