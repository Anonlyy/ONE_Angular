import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import {AppRoutingModule} from "./app-routing.module";

import { HeaderComponent } from './header/header.component';
import {GetDataService} from "./serve/get-data.service";
import { DayPipePipe } from './pipe/day-pipe.pipe';
import { DatePipePipe } from './pipe/date-pipe.pipe';
import { ListComponent } from './list/list.component';
import { LoadingModule } from 'freeng/freeng'
import { DetailsComponent } from './details/details.component';
import { MusicDetailsComponent } from './music-details/music-details.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieService,CookieOptions } from 'angular2-cookie/core';
import { ImageTextDetailsComponent } from './image-text-details/image-text-details.component';
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    DayPipePipe,
    DatePipePipe,
    ListComponent,
    DetailsComponent,
    MusicDetailsComponent,
    MovieDetailsComponent,
    ImageTextDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingModule
  ],
  providers: [GetDataService,CookieService,{ provide: CookieOptions, useValue:{}}, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
