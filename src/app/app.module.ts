import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';

import { ErrorService } from "./error/error.service";
import { MessageService }  from './message.service';
import { ContactService } from './contact.service';


import { ScrollDispatchModule } from '@angular/cdk/scrolling';//new in Angular 7
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { ScrollingModule, ScrollDispatcher } from '@angular/cdk/scrolling';
import { VirtualScrollComponent } from './virtual-scroll/virtual-scroll.component';
import { ErrorComponent } from './error/error.component';
import { ContactComponent } from './contact/contact.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';

import {NgxPaginationModule} from 'ngx-pagination';


//import { ScrollingModule } from '@angular/cdk/scrolling';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'scroll', component: VirtualScrollComponent, canActivate: [AuthGuardService] },
  { path: 'contacts', component: ContactComponent},
  { path: 'contact-details/:id', component: ContactDetailComponent, canActivate: [AuthGuardService]},
  { path: 'contact-create', component: ContactCreateComponent, canActivate: [AuthGuardService]},
  { path: 'contact-edit/:id', component: ContactEditComponent,  canActivate: [AuthGuardService] }
  // { path: 'contacts', component: ContactListComponent },
  // { path: 'contactdetails', component:  ContactDetailsComponent }



];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    VirtualScrollComponent,
    ErrorComponent,
    ContactComponent,
    ContactCreateComponent,
    ContactDetailComponent,
    ContactEditComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ScrollDispatchModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
  //  ScrollingModule,
    // NgbModule,
    //NgbModule.forRoot()
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    ErrorService,
    MessageService,
    ContactService
  //  ScrollDispatcher
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
