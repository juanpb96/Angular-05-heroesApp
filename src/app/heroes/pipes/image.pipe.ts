import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'image'
  // When it is not pure, it starts detecting every change that occurs (side effects: Reduces the performace)
  // pure: false
})
export class ImagePipe implements PipeTransform {

  transform( hero: Hero ): string {
    if ( !hero.id && !hero.alt_img ) {
      return `assets/no-image.png`;
    } else if ( hero.alt_img ) {
      return hero.alt_img;
    }

    return `assets/heroes/${hero.id}.jpg`;
  }

}
