import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact: any;

  constructor(private router: Router, private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    this.getContactDetails(this.route.snapshot.params['id']);
  }

  getContactDetails(id: string) {
    this.contactService.getContact(id)
      .subscribe((data: Contact) => this.contact = data);
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id)
      .subscribe((res: void) => { this.router.navigate(['/contacts']); }, (err) => console.log(err));
  }

}
