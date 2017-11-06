/**
 * Created by Xposean on 2017-10-26.
 */
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {IndexComponent} from "./index/index.component";
import {ListComponent} from "./list/list.component";
import {DetailsComponent} from "./details/details.component";
import {MusicDetailsComponent} from "./music-details/music-details.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {ImageTextDetailsComponent} from "./image-text-details/image-text-details.component";
const routes:Routes = [
  {
    path:'',
    redirectTo:'index',
    pathMatch:'full'
  },
  {
    path:'index',
    component:IndexComponent
  },
  {
    path:'list/:type',
    component:ListComponent
  },
  {
    path:'details/:id',
    component:DetailsComponent
  },
  {
    path:'musicDetails/:id',
    component:MusicDetailsComponent
  },
  {
    path:'movieDetails/:id',
    component:MovieDetailsComponent
  },
  {
    path:'imageTextDetails/:id',
    component:ImageTextDetailsComponent
  }
];



@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}
