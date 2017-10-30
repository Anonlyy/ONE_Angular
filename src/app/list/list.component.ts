import {Component, OnInit, OnDestroy} from '@angular/core';
import {IndexCategory} from "../index/index.component";
import {GetDataService} from "../serve/get-data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnDestroy {


  constructor(private getDataService:GetDataService) { }

  contentList = [];
  reading:IndexCategory = new IndexCategory('0','2017-10-26 06:00:00','xxx','VOL.1846','xxx','xxx');
  lastId:string;//存储最后一组ID,用作获取下一组数据

  music:IndexCategory = new IndexCategory('0','2017-10-26 06:00:00','xxx','VOL.1846','xxx','xxx');
  movie:IndexCategory = new IndexCategory('0','2017-10-26 06:00:00','xxx','VOL.1846','xxx','xxx');
  ngOnInit() {
    const _this = this;
    this.contentList = [];
    // _this.getReadingList();
    _this.getMusicList();
  }
  ngOnDestroy(): void {
    this.contentList = [];
  }
  getReadingList(id:string='0'){
    const _this = this;
    _this.getDataService.getReadings(id).subscribe(
      result=>{
        let data = result.data;
        for(let item of data){
          _this.reading = new IndexCategory(item.id,'阅读',item.img_url,item.author.user_name,item.title,item.forward,item.post_date.slice(0,10));
          _this.contentList.push(_this.reading);
        }
        _this.lastId = '-1';
        _this.lastId = _this.contentList[_this.contentList.length-1].id;
        console.log(_this.contentList[_this.contentList.length-1].id);
      })
  }
  getMusicList(id:string='0'){
    const _this = this;
    _this.getDataService.getMusics(id).subscribe(
      result=>{
        let data = result.data;
        for(let item of data){
          _this.music = new IndexCategory(item.id,'阅读',item.img_url,item.author.user_name,item.title,item.forward,item.post_date.slice(0,10));
          _this.contentList.push(_this.music);
        }
        _this.lastId = '-1';
        _this.lastId = _this.contentList[_this.contentList.length-1].id;
        console.log(_this.contentList[_this.contentList.length-1].id);
      })
  }



  //触底事件
  scrollBottom(e){
    const _this = this;
    //scrollHeight - offsetHeight = 滚动条总高度
    let scrollHeight = e.target.scrollHeight - e.target.offsetHeight;
    //定时器节流
    if(e.target.scrollTop>=scrollHeight){
      let timer = null;
      clearTimeout(timer);
      // _this.pageLoading = true;
      timer = setTimeout(function() {
        // _this.pageIndex +=1;
        // _this.pageLoading = false;
        // _this.showIndex = (30*_this.pageIndex);
        _this.getReadingList(_this.lastId);
        console.log('到底了')
      }, 300);
    }
  }
}
