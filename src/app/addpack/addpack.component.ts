import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent, ThemePalette } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { IPack } from 'src/model/pack';
import { IQuery } from 'src/model/query';
import { PackService } from '../pack.service';

export interface OS {
  name: string;
  color: string;
}

@Component({
  selector: 'app-addpack',
  templateUrl: './addpack.component.html',
  styleUrls: ['./addpack.component.css']
})
export class AddpackComponent implements OnInit {

  ipack = new IPack();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  availableOSArray : string[] = ['Linux', 'MacOS', 'Windows']
  availableOSColorArray : string[] = ['primary', 'warn', 'accent']

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  osArray: OS[] = [
    {name: 'Linux', color: 'primary'},
    {name: 'MacOS', color: 'warn'},
    {name: 'Windows', color: 'accent'}
  ];


  constructor(private _packService: PackService) {}

  addBlankQuery() {
    console.log("Calling addBlankQuery");
    this.ipack.queries.push(new IQuery());
  }

  ngOnInit() {
    this.ipack._id = "";
    this.ipack.queries = [];
  }

  createPack() {
    this._packService.createPack(this.ipack).subscribe(
      response => console.log(response),
      err => console.log(err)
    );

    this.ipack._id = "";
    this.ipack.description = "";
    this.ipack.queries = [];
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (this.availableOSArray.indexOf(value) >= 0) {
      // Add our fruit
      if ((value || '').trim()) {
        this.osArray.push({name: value.trim(), color: this.availableOSColorArray[this.availableOSArray.indexOf(value)]});
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(os: OS): void {
    const index = this.osArray.indexOf(os);

    if (index >= 0) {
      this.osArray.splice(index, 1);
    }

  }  

}
