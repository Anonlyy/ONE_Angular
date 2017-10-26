import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import {AppRoutingModule} from "./app-routing.module";

import {IconModule} from 'freeng/freeng';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import {GetDataService} from "./serve/get-data.service";
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,

    IconModule,
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
