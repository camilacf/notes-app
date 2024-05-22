import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
  standalone: true
})
export class DatePipe implements PipeTransform {

  transform(value: Date): unknown {
    const d = new Date(value)
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }

}
