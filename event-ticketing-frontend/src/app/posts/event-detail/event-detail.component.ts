import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { PostsService } from "../posts.service";
import { AuthService } from "../../auth/auth.service";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { io } from 'socket.io-client';


@Component({
  selector: "app-post-list",
  templateUrl: "./event-detail.component.html",
  styleUrls: ["./event-detail.component.css"]
})
export class EventDetailComponent implements OnInit {
 
  id:any;
  data:any;
  private postsSub: Subscription = new Subscription;
  private authStatusSub: Subscription= new Subscription;
  private socket: any;


  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    private route : ActivatedRoute,
    private toastr: ToastrService
    
  ) {}

  ngOnInit() {
    this.postsService.onEvent().subscribe((updatedData: any) => {
      console.log(updatedData)
      this.updateData();
      
    });
   
    this.id = this.route.snapshot.paramMap.get('id')
    this.postsService.getEventDetails(this.id).subscribe((result:any) => {
      
      this.data = result.data;
      console.log(this.data.date)

 
    });

    
    
    
  }

  bookTicket(id:any){
    this.postsService.bookTicket(this.id).subscribe((result:any) => {
      this.postsService.sendMessage('updateData')
      
      this.toastr.success('Success', 'Ticket Booked Sucessfully');

 
    });
  }

  updateData(){
    console.log('lasdjdkdjs')
    this.postsService.getEventDetails(this.id).subscribe((result:any) => {
      
      this.data = result.data;
      

 
    });

  }

 
}
