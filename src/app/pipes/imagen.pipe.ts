import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const url = environment.imgPath
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, size: string = 'w500'): any {
    if(!imagen){
      return './assets/sinimagen.jpg';
    }

    const imgUrl = url + '/' + size + '/' +imagen
    return imgUrl;
  }

}
