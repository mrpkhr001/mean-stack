import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatTabChangeEvent } from '@angular/material';

import { EnrollmentService } from '../enrollment.service';
import { IEnrollment } from 'src/model/enrollment';
import { PackService } from '../pack.service';
import { IPack } from 'src/model/pack';
import { INodePacks } from 'src/model/node-packs';
import { NodePackService } from '../node-pack.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.css']
})
export class NodeDetailComponent implements OnInit {

  private id: string;
  public enrollemnt = new IEnrollment();
  public errorMsg;

  constructor(private route:ActivatedRoute, 
                private _enrollementService: EnrollmentService, 
                private _packService: PackService,
                private _nodePackService: NodePackService,
                private _router: Router) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get("id")
    this._enrollementService.getEnrollment(this.id)
      .subscribe(data => this.enrollemnt = data, 
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 401) {
              this._router.navigate(['/login'])
            }
          }
          this.errorMsg = error
        });

  }

  nodePacks = new INodePacks();

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.enrollemnt.packs, event.previousIndex, event.currentIndex);
  }  
}
