import { Component, OnInit} from '@angular/core';
import { PackService } from '../pack.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: '',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit {

  public packs = [];
  public errorMsg;
  showPack = true;
  public isAdmin: boolean = false;

  constructor(private _packService: PackService, private _router: Router, private _registerService: RegisterService) { }

  ngOnInit() {
    this._packService.getPacks()
      .subscribe(data => {this.packs = data},
                error => {
                  if (error instanceof HttpErrorResponse) {
                    if (error.status == 401) {
                      this._router.navigate(['/login'])
                    }
                  }
                  this.errorMsg = error
                });

    this._registerService.getUserRole().subscribe(data => {
      {
        if (data.role === "ADMIN") {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    },
      error => this.errorMsg = error
    );

  }

  showPacks() {
    this.showPack = false;
  }

}
