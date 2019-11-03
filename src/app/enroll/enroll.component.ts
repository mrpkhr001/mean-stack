import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {ICompanyEnrollment} from '../../model/company-enrollment';
import { CompanyEnrollmentService } from '../company-enrollment.service';
import { PackService } from '../pack.service';
import { IPack } from 'src/model/pack';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {

  public enrolledCompanies = [];
  public errorMsg;
  
  displayedColumns: string[] = ['companyName', 'companyAddress', 'country', 'phone', 'website', 'enrollmentSecret'];
  dataSource = this.enrolledCompanies;

  showEnrollments: boolean = true;
  newCompanyEnrollment: ICompanyEnrollment = new ICompanyEnrollment();

  constructor(private _packService: PackService, private _companyEnrollmentService: CompanyEnrollmentService, private _router: Router) { }

  ngOnInit() {
    this._companyEnrollmentService.getEnrolledCompanies()
      .subscribe(data => {this.enrolledCompanies = data},
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 401) {
              this._router.navigate(['/login'])
            }
          }
          this.errorMsg = error
        });
          
    this._packService.getPacks().subscribe(data => 
      {this.allPacks = data; this.allPacks.forEach(pack => this.availablePacks.push(pack._id))}, 
      error => this.errorMsg = error);

  }
  
  appliedPacks: String[] = [];
  availablePacks: String[] = [];
  allPacks: IPack[] = [];
  

  public enrollCompany() {
    this.showEnrollments = true;
    this._companyEnrollmentService.enrollCompany(this.newCompanyEnrollment).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

  public showEnrollmentForm() {
    this.newCompanyEnrollment = new ICompanyEnrollment();
    this.showEnrollments = false;
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

    this.newCompanyEnrollment.packs = this.appliedPacks;

  }

}
