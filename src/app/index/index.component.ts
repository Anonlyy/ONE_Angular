import { Component, OnInit } from '@angular/core';
import {GetDataService} from "../serve/get-data.service";

const defaultSrc = 'https://raw.githubusercontent.com/Anonlyy/ONE_Angular/master/src/assets/image/default.jpg';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss']
})
export class IndexComponent implements OnInit {
  currentId:string; //今日Id
  windowHeight:number = 0;
  indexImageText:IndexImageText = new IndexImageText('0','0','2017-10-26 06:00:00',defaultSrc,'VOL.1846','xxx');
  reading:IndexCategory = new IndexCategory('0','0','2017-10-26 06:00:00',defaultSrc,'VOL.1846','xxx','xxx');
  music:IndexCategory = new IndexCategory('0','0','2017-10-26 06:00:00',defaultSrc,'VOL.1846','xxx','xxx');
  movie:IndexCategory = new IndexCategory('0','0','2017-10-26 06:00:00',defaultSrc,'VOL.1846','xxx','xxx');
  constructor(private getDataService:GetDataService) { }

  ngOnInit() {
    const _this = this;
    this.windowHeight = window.innerHeight;
    // console.log(this.windowHeight);
    _this.getDataService.getIdList().subscribe(
      result=>{
        _this.currentId = result.data[0];
        _this.getIndexDetail(_this.currentId);
      }
    );
  }

  /**
   * 获取首页数据
   * @param id
   */
  getIndexDetail(id:string){
    const _this = this;
    _this.getDataService.getImageTextDetail(id).subscribe(
      result=>{
        let data = result.data;
        for(let item of result.data.content_list){
          switch (item.category){
            case "0":
              _this.indexImageText = new IndexImageText(item.id,item.content_id,data.date,item.img_url,item.volume,item.forward);
              break;
            case "1":
              _this.reading = new IndexCategory(item.id,item.content_id,'阅读',item.img_url,item.author.user_name,item.title,item.forward);
              break;
            case "4":
              _this.music = new IndexCategory(item.id,item.content_id,'音乐',item.img_url,item.author.user_name,item.title,item.forward);
              break;
            case "5":
              _this.movie = new IndexCategory(item.id,item.content_id,'影视',item.img_url,item.author.user_name,item.title,item.forward);
              break;
          }
        }
      })
  }



}

export class IndexImageText{
  constructor(
    public id:string,
    private content_id:string, //详情页传值id
    public date:string,  //时间
    public picUrl:string,
    public volume:string, //编号
    public title:string,  //标题语
    public words_info?:string, //出处
    public pic_info?:string //图片出处
  ){}
}


// 主页分类数据对象
export class IndexCategory{
  constructor(
    public id:string,
    public content_id:string, //详情页传值id
    public category:string, //类型(阅读:1 音乐:4 影视:5)
    public picUrl:string,
    public authorName:string,
    public title:string, //标题
    public content:string, //正文
    public date?:string
  ){}
}

