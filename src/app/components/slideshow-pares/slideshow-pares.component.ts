import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas:Pelicula[] = [];

  @Output() cargarmas = new EventEmitter();

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  slidesOpts = {
    slidesPerView:3.3,
    freeMode:true,
    spaceBetween:-10
  };

  cargarMas(){
    this.cargarmas.emit()
  }
  async verDetalle(id:string){
    const modal = await this.modalCtrl.create({
      component:DetalleComponent,
      componentProps:{
        id
      }
    })

    await modal.present()
  }
}
