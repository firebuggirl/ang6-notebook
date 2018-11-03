import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent {

  contact: any = {};

  constructor(private router: Router, private contactService: ContactService) { }

  saveContact() {
    this.contactService.insertContact(this.contact)
      .subscribe((res: Contact) => { this.router.navigate(['/contacts']); }, (err) => console.log(err));
  }
}
