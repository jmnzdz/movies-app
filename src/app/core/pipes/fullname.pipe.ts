import { Pipe, PipeTransform } from '@angular/core';
import { Actor } from '../interfaces/actor.interface';

@Pipe({
  name: 'fullname'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Actor, ...args: any[]): any {
    return value.first_name + ' ' + value.last_name;
  }
}
