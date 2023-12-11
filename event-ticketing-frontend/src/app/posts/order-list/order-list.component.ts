import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from "../../auth/auth.service";
import { Router ,ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.css"]
})
export class OrderListComponent implements OnInit {
  
  posts: any = [] ;
  postsPerPage = 2;
  page = 1;
  totalPosts =0;
  id:any;
  data:any;
  private postsSub: Subscription = new Subscription;
  private authStatusSub: Subscription= new Subscription;

  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    private router: Router,
    private route : ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.postsService.getOrderList(this.id).subscribe((result:any) => {
      this.data = result.data;
      this.posts = this.data;
       console.log(this.posts,'posts') 
      // console.log(this.data.date)

 
    });
  }

  eventDetail(id:any)
  {
    //
  }

  onChangedPage(event:any) {
    //
  }
  
}
