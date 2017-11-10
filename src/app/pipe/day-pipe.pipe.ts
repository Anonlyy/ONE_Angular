import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayPipe'
})
export class DayPipePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.slice(8,10);
  }

}
