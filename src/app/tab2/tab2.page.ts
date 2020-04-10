import { Pelicula } from 'src/app/interfaces/interfaces';
import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public texto_buscar:string = ""
  public peliculas:Pelicula[] = []; 
  public buscando:boolean = false;

  public ideas:string[] = ['Spiderman','Avengers','El señor de los anillos','La vida es bella'];

  constructor( private service:MoviesService, private modalCtrl:ModalController ) {}

  buscar( event ){
    const valor = event.detail.value;
    if(valor !== ""){
      this.buscando = true;
      this.service.buscarPelicula(valor)
          .subscribe(res=>{
            this.peliculas = res['results'];
            this.buscando = false;
          })
    }else{
      this.peliculas = [];
    }
  }

  buscarIdea(idea){
    this.texto_buscar = idea;
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
