import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortes'
})
export class ShortesPipe implements PipeTransform {

  transform(value: string, args: number): string {
    if (value !==  null) {
      return value.length > args ? value.substring(0, args) + '...':value;
    }
    return''
  }

}
