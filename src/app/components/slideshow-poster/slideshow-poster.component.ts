import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() peliculas:Pelicula[] = [];
  @Output() cerrada = new EventEmitter;

  constructor(private modalCtrl:ModalController) { }

  slidesOpts = {
    slidesPerView:3.3,
    freeMode:true,
  };
  
  ngOnInit() {}
  async verDetalle(id:string){
    const modal = await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps:{
        id
      }
    })
    await modal.present()
    
    const { data } = await modal.onWillDismiss();
    this.cerrada.emit(data)
    
    
    
  }
}
