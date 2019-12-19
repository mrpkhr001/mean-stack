import { Component, OnInit, Injector } from '@angular/core';
import { ICompanyEnrollment } from 'src/model/company-enrollment';
import { IPack } from 'src/model/pack';
import { PackService } from '../pack.service';
import { ActivatedRoute } from '@angular/router';
import { CompanyEnrollmentService } from '../company-enrollment.service';
import { Observable, forkJoin } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']
})
export class CompanyUpdateComponent implements OnInit {

  public id: string;
  public enrolledCompany: ICompanyEnrollment;
  public errorMsg;

  appliedPacks: string[] = [];
  availablePacks: string[] = [];
  allPacks: IPack[] = [];

  constructor(private _packService: PackService, private route:ActivatedRoute, private _injector: Injector, private _companyEnrollmentService: CompanyEnrollmentService) { }


  ngOnInit() {

    this.id = this.route.parent.snapshot.params['id']
    
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
