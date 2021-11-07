import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    const hour = Math.trunc(value / 60);
    return hour > 0 ? hour + 'h ' + (value - hour * 60) + 'm' : value;
  }
}
