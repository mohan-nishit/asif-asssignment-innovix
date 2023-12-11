import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from 'ngx-pagination';
import { EventDetailComponent } from "./event-detail/event-detail.component";

import { PostListComponent } from "./post-list/post-list.component";
import { HeaderComponent } from "../header/header.component";
import { OrderListComponent } from "./order-list/order-list.component";

import { AngularMaterialModule } from "../angular-material.module";

@NgModule({
   declarations: [
    PostListComponent,
    EventDetailComponent,
    HeaderComponent,
    OrderListComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    NgxPaginationModule
    // BrowserModule
  ],
})
export class PostsModule {}
