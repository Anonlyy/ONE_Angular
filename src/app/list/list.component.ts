import {Component, OnInit, OnDestroy} from '@angular/core';
import {IndexCategory, IndexImageText} from "../index/index.component";
import {GetDataService} from "../serve/get-data.service";
import {ActivatedRoute} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";

const defaultSrc = 'https://raw.githubusercontent.com/Anonlyy/ONE_Angular/master/src/assets/image/default.jpg';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnDestroy {


  constructor(private getDataService: GetDataService, private routerInfo: ActivatedRoute, private cookieService: CookieService) {
  }

  isLoading: boolean = true;
  listType: number = -1;
  linkUrl: string;
  contentList = [];
  reading: IndexCategory = new IndexCategory('0', '0', '2017-10-26 06:00:00', defaultSrc, 'VOL.1846', 'xxx', 'xxx');
  lastId: string;//存储最后一组ID,用作获取下一组数据
  ImageTextIdList: any; //10天的ID集合
  indexImageText: IndexImageText = new IndexImageText('0', '0', '2017-10-26 06:00:00', defaultSrc, 'VOL.1846', 'xxx');
  music: IndexCategory = new IndexCategory('0', '0', '2017-10-26 06:00:00', defaultSrc, 'VOL.1846', 'xxx', 'xxx');
  movie: IndexCategory = new IndexCategory('0', '0', '2017-10-26 06:00:00', defaultSrc, 'VOL.1846', 'xxx', 'xxx');

  ngOnInit() {
    const _this = this;
    _this.contentList = [];
    _this.routerInfo.params.subscribe(
      data=> {
        let result: any = data;
        _this.listType = parseInt(result.type);
        _this.isLoading = true;
        _this.contentList = [];
        switch (_this.listType) {
          case 0:
            if (!window.sessionStorage.hasOwnProperty('ImageTextList') || !_this.cookieService.getObject('ImageTextIdList')) {
              _this.getImageTextIdList();
            }
            else {
              //noinspection TypeScriptUnresolvedVariable
              _this.contentList = JSON.parse(window.sessionStorage.getItem('ImageTextList'));
              _this.ImageTextIdList = _this.cookieService.getObject('ImageTextIdList');
              _this.isLoading = false;
            }
            _this.linkUrl = '/imageTextDetails';
            break;
          case 1:
            _this.getReadingList();
            _this.linkUrl = '/details';
            break;
          case 4:
            _this.getMusicList();
            _this.linkUrl = '/musicDetails';
            break;
          case 5:
            _this.getMovieList();
            _this.linkUrl = '/movieDetails';
            break;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.contentList = [];
  }

  getImageTextIdList() {
    const _this = this;
    _this.getDataService.getIdList().subscribe(
      result=> {
        _this.ImageTextIdList = [];
        _this.ImageTextIdList = result.data;
        console.log(_this.ImageTextIdList);
        if (_this.ImageTextIdList.length > 0) {
          _this.getImageTextList();
        }
      },
      error=> {
        console.log('获取idList出错' + error);
      });
  }

  getImageTextList() {
    const _this = this;
    _this.contentList = [];
    for (let item of _this.ImageTextIdList) {
      _this.getDataService.getImageTextDetail(item).subscribe(
        result=> {
          let data = result.data.content_list[0];
          _this.indexImageText = new IndexImageText(data.id, data.content_id, data.post_date, data.img_url, data.volume, data.forward, data.words_info, data.title + " | " + data.pic_info);
          _this.contentList.push(_this.indexImageText);
        });



    }
    let option = {
      expires: _this.getDataService.setCookie(24) //设置缓存有效期,小时为单位
    }
    setTimeout(()=> {
      window.sessionStorage.setItem('ImageTextList', JSON.stringify(_this.contentList));
      _this.cookieService.putObject('ImageTextIdList', _this.ImageTextIdList, option);
    }, 300);
    _this.isLoading = false;
  }

  getReadingList(id: string = '0') {
    const _this = this;
    _this.getDataService.getReadings(id).subscribe(
      result=> {
        let data = result.data;
        for (let item of data) {
          _this.reading = new IndexCategory(item.id, item.content_id, '阅读', item.img_url, item.author.user_name, item.title, item.forward, item.post_date.slice(0, 10));
          _this.contentList.push(_this.reading);
        }
        _this.isLoading = false;
        _this.lastId = '-1';
        _this.lastId = _this.contentList[_this.contentList.length - 1].id;
      })
  }

  getMusicList(id: string = '0') {
    const _this = this;
    _this.getDataService.getMusics(id).subscribe(
      result=> {
        let data = result.data;
        for (let item of data) {
          _this.music = new IndexCategory(item.id, item.content_id, '音乐', item.img_url, item.author.user_name, item.title, item.forward, item.post_date.slice(0, 10));
          _this.contentList.push(_this.music);
        }
        _this.isLoading = false;
        // console.log(this.contentList);
        _this.lastId = _this.contentList[_this.contentList.length - 1].id;
      })
  }

  getMovieList(id: string = '0') {
    const _this = this;
    _this.getDataService.getMovies(id).subscribe(
      result=> {
        let data = result.data;
        for (let item of data) {
          _this.movie = new IndexCategory(item.id, item.content_id, '影视', item.img_url, item.author.user_name, item.title, item.forward, item.post_date.slice(0, 10));
          _this.contentList.push(_this.movie);
        }
        _this.isLoading = false;
        _this.lastId = '-1';
        _this.lastId = _this.contentList[_this.contentList.length - 1].id;
      })
  }

  //回到顶部
  backTop() {
    document.getElementById('app-list').scrollTop = 0;
  }

  //触底事件
  scrollBottom(e) {
    const _this = this;
    //scrollHeight - offsetHeight = 滚动条总高度
    let scrollHeight = e.target.scrollHeight - e.target.offsetHeight;
    //定时器节流
    if (e.target.scrollTop >= scrollHeight) {
      let timer = null;
      clearTimeout(timer);
      timer = setTimeout(function () {
        switch (_this.listType) {
          case 0:
            return;
          case 1:
            _this.getReadingList(_this.lastId);
            break;
          case 4:
            _this.getMusicList(_this.lastId);
            break;
          case 5:
            _this.getMovieList(_this.lastId);
            break;
        }
        console.log('到底了')
      }, 300);
    }
  }
}
