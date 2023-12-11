import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Post } from "./post.model";
import { io  } from 'socket.io-client';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


const BACKEND_URL = environment.apiUrl + "/event/";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: any = [];
  data:any;
  private socket = io('http://localhost:3000',{transports:['websocket']});
  private messageRelay: BehaviorSubject<any> = new BehaviorSubject(null);
   

  private postsUpdated = new Subject<{ posts: any; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected to server');
    });
    
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get(
        BACKEND_URL+'list' + queryParams
      )
      // .pipe(
      //   map((postData :any) => {
      //     return {
      //       posts: postData.data.map((post:any) => {
      //         return {
      //           title: post.title,
      //           content: post.content,
      //           id: post.id,
      //           imagePath: post.imagePath,
      //           creator: post.creator
      //         };
      //       }),
      //       maxPosts: postData.maxPosts
      //     };
      //   })
      // )
      .subscribe((transformedPostData:any) => {
        console.log('transformedPostData',transformedPostData);
        this.posts = transformedPostData.data;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.total
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getEventDetails(id: string) {
    return this.http.get(BACKEND_URL + "details/" + id)
  }

  bookTicket(id:any){
    return this.http.get(BACKEND_URL + "book/" + id)
  }
  getOrderList(id:any){
    return this.http.get(BACKEND_URL + "order")
  }

  // onEvent(): Observable<any> {
  //   // return new Observable((observer) => {
  //   //   this.socket.on('angular', (data: any) => {
  //   //     console.log('sdldkfsdld') 
  //   //     observer.next(data);
  //   //   });
  //   // });
    
  // }

  sendMessage(data: any) {
    this.socket.emit('updateData', data);
  }

  onEvent(){
    this.socket.on('angular', (data: any) => {
      console.log('sdldkfsdld') 
      this.messageRelay.next(data);
    });
    return this.messageRelay.asObservable();
  }
  
}
