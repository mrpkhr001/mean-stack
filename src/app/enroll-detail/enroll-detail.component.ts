import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enroll-detail',
  templateUrl: './enroll-detail.component.html',
  styleUrls: ['./enroll-detail.component.css']
})
export class EnrollDetailComponent implements OnInit {

  public id: string;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")
  }

}
