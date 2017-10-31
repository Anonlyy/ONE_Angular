import { Component, OnInit } from '@angular/core';
import {GetDataService} from "../serve/get-data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private getDataService:GetDataService,private routerInfo:ActivatedRoute) { }
  storyDetail:ReadDetail = new ReadDetail('0','xxxx','xxx','/assets/image/default.jpg','xxx','xxx');
  ngOnInit() {
    this.routerInfo.params.subscribe(
      result=>{
        let data:any = result;
        console.log(data.id);
        this.getReadingDetails(data.id);
      }
    )
  }
  getReadingDetails(id:string){
    const _this = this;
    _this.getDataService.getReadingDetails(id).subscribe(
      result=>{
        let data = result.data;
        let artList = [];
        for(let i of data.author){artList.push(i.user_name);}
        _this.storyDetail = new ReadDetail(data.content_id,artList.join('/'),data.author[0].summary,data.author[0].web_url,data.hp_title,data.hp_content,data.hp_author_introduce);
        // console.log(_this.storyDetail);
      },
      error=>{
        console.log('获取内容出错'+error);
      })
  }
}


export class ReadDetail{
  constructor(
    private id:string,
    public authorName:string,
    public authorDesc:string,
    public authorImgurl:string = '/assets/image/default.jpg', //作者头像
    public title:string,
    public content:string,
    public author_introduce?:string, //编辑作者
    public copyright?:string,   //转载声明
    public picUrl:string = '/assets/image/default.jpg', //专辑封面图片
  ){}
}
