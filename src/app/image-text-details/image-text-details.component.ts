import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GetDataService} from "../serve/get-data.service";
import {IndexImageText} from "../index/index.component";

const defaultSrc = 'https://raw.githubusercontent.com/Anonlyy/ONE_Angular/master/src/assets/image/default.jpg';
@Component({
  selector: 'app-image-text-details',
  templateUrl: './image-text-details.component.html',
  styleUrls: ['./image-text-details.component.scss']
})
export class ImageTextDetailsComponent implements OnInit {
  constructor(private routerInfo:ActivatedRoute,private getDataService:GetDataService) { }
  indexImageText:IndexImageText = new IndexImageText('0','0','2017-10-26 06:00:00',defaultSrc,'VOL.1846','xxx');
  ngOnInit() {
    this.routerInfo.params.subscribe(
      result=>{
        let data:any = result;
        console.log(data.id);
        this.getImageTextDetails(data.id);
      }
    )
  }
  getImageTextDetails(id:string){
    const _this = this;
    _this.getDataService.getImageTextDetail(id).subscribe(
      result=> {
        let data = result.data.content_list[0];
        _this.indexImageText = new IndexImageText(data.id,data.content_id,data.post_date,data.img_url,data.volume,data.forward,data.words_info,data.title+" | "+data.pic_info);
        console.log(_this.indexImageText);
      }
    )
  }
}
