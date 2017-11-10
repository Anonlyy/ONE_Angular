import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let mon = ['Jan.','Feb.','Mar.','Apr.','May.','Jun.','Jul.','Aug.','Sept.','Oct.','Nov.','Dec.']
    return value.slice(0,4)+' '+mon[parseInt(value.slice(5,7))-1];
  }

}
