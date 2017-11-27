import { Component, OnInit } from '@angular/core';
import {GetDataService} from "../serve/get-data.service";
import {ActivatedRoute} from "@angular/router";
import {ReadDetail} from "../details/details.component";

const defaultSrc = 'https://raw.githubusercontent.com/Anonlyy/ONE_Angular/master/src/assets/image/default.jpg';
@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.scss']
})
export class MusicDetailsComponent implements OnInit {

  musicStory = {
    title:'',
    album:'',
    story_author:''
  };
  commentType = {
    type:'music',
    id:0
  }
  musicDetail:ReadDetail = new ReadDetail('0','xxxx','xxx',defaultSrc,'xxx','xxx');
  currentId:string = '0';
  constructor(private getDateService:GetDataService,private routerInfo:ActivatedRoute) { }

  ngOnInit() {
    const _this = this;
    _this.routerInfo.params.subscribe(
      result=>{
        let data:any = result;
        _this.currentId = data.id;
        _this.commentType.id = data.id;
        _this.getMusicDetails(_this.currentId);
      }
    )
  }
  getMusicDetails(id:string){
    const _this = this;
    _this.getDateService.getMusicDetails(id).subscribe(
      result=>{
        let data = result.data;
        let artList = [];
        for(let i of data.author_list){artList.push(i.user_name);}
        _this.musicDetail = new ReadDetail(data.id,data.story_author.user_name,data.story_author.summary,data.story_author.web_url,data.story_title,data.story,data.charge_edt,data.copyright,data.cover);
        _this.musicStory = {
          title:data.title,
          album:data.album,
          story_author:artList.join('/')
        }
        // console.log(_this.musicStory);
      },
      error=>{
        console.log('获取内容出错'+error);
      }
    )
  }
  //回到顶部
  backTop(){
    window.scrollTo(0,0);
  }
}
