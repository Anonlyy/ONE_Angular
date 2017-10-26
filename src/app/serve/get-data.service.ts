import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Http} from "@angular/http";

@Injectable()
export class GetDataService {

  constructor(private http:Http) { }


  /**
   * 获取前十天的图文id数组集合
   * @returns {Observable<R|T>}
   */
  public getIdList():Observable<any>{
    return this.http.get(`http://v3.wufazhuce.com:8000/api/onelist/idlist`)
      .map(this.handleSuccess)
      .catch(this.handleError)
  }
  public getImageTextDetail(id:string):Observable<any>{
    return this.http.get(`http://v3.wufazhuce.com:8000/api/onelist/${id}/0`)
      .map(this.handleSuccess)
      .catch(this.handleError)
  }


  public handleSuccess(res){
    return res.json();
  }
  public handleError(error){
    return Observable.throw(`${error}`);
  }
}
