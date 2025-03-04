import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termext'
})
export class TermextPipe implements PipeTransform {

  transform(text: string): string {
    return text.split(" ").slice(0,2).join(" ");
  }

}
