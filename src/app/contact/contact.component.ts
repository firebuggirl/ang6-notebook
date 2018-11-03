import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../models/Contact';
import { HttpClient, HttpParams } from '@angular/common/http';

import {ChangeDetectionStrategy, Input} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.Default,//Default means that the change detector's mode will be initially set to CheckAlways
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // contacts: Array<any>;
  // totalRec : number;
  // page: number = 1;
  // itemsPerPage: number;
  //
  // constructor(private contactService: ContactService, private http: HttpClient) { }
  //
  // ngOnInit() {
  //   // this.contactService.getAllContacts()
  //   //   .subscribe((data: Contact[]) => this.contacts = data);
  //
  //     this.contactService.getPaginatedContacts()
  //     .subscribe((data: Contact[]) => this.contacts = data);
  // }


    contacts: Array<any>;
    totalRec : number;
    page: number = 1;
    itemsPerPage: number;

    constructor(private contactService: ContactService, private http: HttpClient) {

    }

    ngOnInit() {

        this.contactService.getPaginatedContacts()
        .subscribe((data: Contact[]) => this.contacts = data);
     }

}
