import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isShow:boolean = false;
  menuList = [
    {
      icon:'czs-newspaper-l',
      name:'图文',
      link:"0",
    },
    {
      icon:'czs-book-l',
      name:'阅读',
      link:"1",
    },
    {
      icon:'czs-music-note-l',
      name:'音乐',
      link:"4",
    },
    {
      icon:'czs-network-l',
      name:'影视',
      link:"5",
    }
  ]
  constructor(private router:Router) { }

  ngOnInit() {
  }

  toList(){
    // this.router.navigate([this.menuList[i].link,this.menuList[i].key]);
    this.isShow = false;
  }
  toAbout(){
    window.location.href = 'http://www.xposean.xin/about/';
  }
  showMenu(){
    this.isShow = true;
  }
}
