import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


import { CompanyEnrollmentService } from '../company-enrollment.service';
import { ICompanyEnrollment } from 'src/model/company-enrollment';
import { IPack } from 'src/model/pack';
import { PackService } from '../pack.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-enroll-detail',
  templateUrl: './enroll-detail.component.html',
  styleUrls: ['./enroll-detail.component.css']
})
export class EnrollDetailComponent implements OnInit {

  private id: string;
  public enrolledCompany: ICompanyEnrollment;
  public errorMsg;

  appliedPacks: String[] = [];
  availablePacks: String[] = [];
  allPacks: IPack[] = [];

  constructor(private _packService: PackService, private route:ActivatedRoute, private _companyEnrollmentService: CompanyEnrollmentService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")

    this.requestDataFromMultipleSources().subscribe(responseList => {
      this.appliedPacks = responseList[0].packs;
      this.enrolledCompany = responseList[0];

      this.allPacks = responseList[1];
      this.allPacks.forEach(pack => {
        if (this.appliedPacks.indexOf(pack._id) < 0 ) {
          this.availablePacks.push(pack._id);
        }
      }) 

  });

  }

  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.getAppliedPacks();
    let response2 = this.getAllPacks();

    return forkJoin([response1, response2]);
  }

  getAppliedPacks() {
    
    return this._companyEnrollmentService.getEnrolledCompany(this.id);
  }

  getAllPacks() {
    return this._packService.getPacks();  
  }


  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    this.enrolledCompany.packs = this.appliedPacks;
  }

  updateEnrolledCompany() {
    console.log(this.enrolledCompany);
    this._companyEnrollmentService.updateEnrolledCompany(this.enrolledCompany)
    .subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

}
