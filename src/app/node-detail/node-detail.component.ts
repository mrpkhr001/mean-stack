import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { forkJoin, Observable } from 'rxjs';

import { EnrollmentService } from '../enrollment.service';
import { IEnrollment } from 'src/model/enrollment';
import { PackService } from '../pack.service';
import { PackDataService } from '../pack-data.service';
import { IPack } from 'src/model/pack';
import { INodePacks } from 'src/model/node-packs';
import { IPackQueryIndex } from 'src/model/packQueryIndex';
import { NodePackService } from '../node-pack.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent implements OnInit {

  private id: string;
  public enrollment = new IEnrollment();
  nodePacks = new INodePacks();
  public errorMsg;
  packQueryIndex: IPackQueryIndex[] = [];
  allPacks: IPack[] = [];
  step = -1;
  queryData = {}

  constructor(private route:ActivatedRoute, 
                private _enrollementService: EnrollmentService, 
                private _packService: PackService,
                private _packDataService: PackDataService,
                private _nodePackService: NodePackService,
                private _router: Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get("id")

    this.requestDataFromMultipleSources().subscribe(responseList => {
      this.enrollment = responseList[0];
      this.allPacks = responseList[1];

      this.allPacks.forEach(pack => {
        if (this.enrollment.packs.indexOf(pack._id) >= 0 ) {
          for (let iquery of pack.queries) {
              let pqi = new IPackQueryIndex()
              pqi.pack = pack._id;
              pqi.packDescription = pack.description;
              pqi.query = iquery._id;
              pqi.queryDescription = iquery.description;
              pqi.packQueryIndex = "pack_" + pack._id + "_" + iquery._id;
              this.packQueryIndex.push(pqi);
          }
        }
      })
    });
  }

  setStep(index: number) {
    this.step = index;
    let queryIndex = this.packQueryIndex[index].packQueryIndex;
    console.log("queryIndex : " + queryIndex);
    this._packDataService.getDataForPack(this.id, queryIndex).subscribe(
            response => {this.queryData = response}, error => {}
    );

  }

  public requestDataFromMultipleSources(): Observable<any[]> {

    let response1 = this.getEnrolledNode();
    let response2 = this.getAllPacks();

    return forkJoin([response1, response2]);
  }

  getEnrolledNode() {
    return this._enrollementService.getEnrollment(this.id);
  }

  getAllPacks() {
    return this._packService.getPacks();
  }



  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.enrollment.packs, event.previousIndex, event.currentIndex);
  }  
}
