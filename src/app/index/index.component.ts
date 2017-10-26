import { Component, OnInit } from '@angular/core';
import {GetDataService} from "../serve/get-data.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss']
})
export class IndexComponent implements OnInit {
  currentId:string; //今日Id
  windowHeight:number = 0;
  indexImageText:IndexImageText = new IndexImageText('0','2017-10-26 06:00:00','xxx','VOL.1846','xxx');
  constructor(private getDataService:GetDataService) { }

  ngOnInit() {
    const _this = this;
    this.windowHeight = window.innerHeight;
    console.log(this.windowHeight);
    _this.getDataService.getIdList().subscribe(
      result=>{
        _this.currentId = result.data[0];
        _this.getImageTextDetail(_this.currentId);
      }
    );
  }


  getImageTextDetail(id:string){
    const _this = this;
    _this.getDataService.getImageTextDetail(id).subscribe(
      result=>{
        let data = result.data;
        _this.indexImageText = new IndexImageText(data.content_list[0].id,data.date,data.content_list[0].img_url,data.content_list[0].volume,data.content_list[0].forward);
      }
    )
  }
}

class IndexImageText{
  constructor(
    public id:string,
    public date:string,  //时间
    public picUrl:string,
    public volume:string, //编号
    public title:string  //标题语
  ){}
}
