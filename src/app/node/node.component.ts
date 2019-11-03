import { Component, OnInit } from '@angular/core';

import { EnrollmentService } from '../enrollment.service';
import { IEnrollment } from 'src/model/enrollment';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  public enrollemnts: IEnrollment[] = [];
  public errorMsg;

  public enrolledCompanies = [];

  displayedColumns: string[] = ['_id', 'computer_name', 'hardware_model', 'hardware_serial', 'hardware_vendor', 'start_time'];
  dataSource = this.enrollemnts;


  constructor(private _enrollmentService: EnrollmentService, private _router: Router) { }

  ngOnInit() {
    this._enrollmentService.getEnrollments()
    .subscribe(data => {this.enrollemnts = data},
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
            this._router.navigate(['/login'])
          }
        }
        this.errorMsg = error
      });
  }

}
