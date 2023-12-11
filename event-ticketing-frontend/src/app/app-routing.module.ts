import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./auth/auth.guard";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { EventDetailComponent } from "./posts/event-detail/event-detail.component";
import { OrderListComponent } from "./posts/order-list/order-list.component";

const routes: Routes = [
  { path: "", component: PostListComponent, canActivate: [AuthGuard]},
  { path: "detail/:id", component: EventDetailComponent, canActivate: [AuthGuard]},
  { path: "order", component: OrderListComponent, canActivate: [AuthGuard]},

  { path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]  
})
export class AppRoutingModule { }
