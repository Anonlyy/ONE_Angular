import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GetDataService} from "../serve/get-data.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {


  movieDetail:MovieDetail = new MovieDetail('0','xxxx','xxx','xxx','xxx','xxx');
  currentId:string = '0';
  photoList = {
    subTitle:'',
    bannerUrl:'/assets/image/default.jpg',
  }
  constructor(private getDateService:GetDataService,private routerInfo:ActivatedRoute) { }

  ngOnInit() {
    const _this = this;
    _this.routerInfo.params.subscribe(
      result=>{
        let data:any = result;
        _this.currentId = data.id;
        _this.getMovieDetails(_this.currentId);
        _this.getPhotoList(_this.currentId);
      }
    )
  }
  getMovieDetails(id:string){
    const _this = this;
    _this.getDateService.getMovieDetails(id).subscribe(
      result=>{
        let data = result.data.data[0];
        _this.movieDetail = new MovieDetail(data.movie_id,data.user.user_name,data.title,data.content,data.charge_edt,data.copyright);
        console.log(_this.movieDetail);
      },
      error=>{
        console.log('获取内容出错'+error);
      }
    )
  }

  getPhotoList(id:string){
    const _this = this;
    _this.getDateService.getMovieDetailsByPhoto(id).subscribe(
      result=>{
        let data = result.data;
        _this.photoList = {
          subTitle:data.title,
          bannerUrl:data.detailcover,
        }
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

export class MovieDetail{
  constructor(
    private id:string,
    public authorName:string,
    public title:string,
    public content:string,
    public author_introduce?:string, //编辑作者
    public copyright?:string,   //转载声明
  ){}
}
