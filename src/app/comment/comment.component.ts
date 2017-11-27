import { Component, OnInit, Input } from '@angular/core';
import {GetDataService} from "../serve/get-data.service";

const defaultSrc = 'https://raw.githubusercontent.com/Anonlyy/ONE_Angular/master/src/assets/image/default.jpg';
@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() commentType:any;
  commentDetails:Comment=new Comment('0','xx','null',defaultSrc,'2017-12-01 12:00:00');
  commentList = [];
  isAll:boolean = true;
  constructor(private getDataService:GetDataService) { }

  ngOnInit() {
    this.getCommentDetails();
  }


  getCommentDetails(){
    const _this = this;
    _this.getDataService.getCommentDetails(_this.commentType.type,_this.commentType.id).subscribe(
      result=>{
        let data = result.data.data;
        for(let item of data){
          _this.commentDetails = new Comment(item.id,item.content,item.user.user_name,item.user.web_url,item.input_date);
          _this.commentList.push(_this.commentDetails);
        }
        console.log(_this.commentList);
      },
      error=>{
        console.log('获取评论出错:'+error);
      }
    )
  }
}


export class Comment{
  constructor(
    public id:string,
    public content:string,
    public user_name:string,
    public avatar:string,
    public date:string
  ){

  }
}
