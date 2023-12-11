import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { LoginComponent } from "./auth/login/login.component";
//import { AngularMaterialModule } from "./angular-material.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { PostListComponent } from './posts/post-list/post-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './header/header.component';
import { EventDetailComponent } from './posts/event-detail/event-detail.component';

import { OrderListComponent } from "./posts/order-list/order-list.component";



@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    HeaderComponent,
    EventDetailComponent,
    OrderListComponent  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
