import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return '#' + value.toLowerCase();
  }
}
