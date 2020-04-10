import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { PeliculaDetalle, RespuestaCredits, Cast } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id; 
  oculto:number = 150;
  public nombre:string = "";
  public pelicula:PeliculaDetalle = {};
  public actores:Cast[] = [];

  constructor( private service:MoviesService, private modal:ModalController, private dataLocal:DataLocalService ) { }
  slidesActores = {
    slidesPerView:3.3,
    freeMode:true,
    spaceBetween:-5
  }
  async ngOnInit() {
    const existe = await this.dataLocal.existePelicula(this.id)
    if(existe){
      this.nombre = "star"
    }else{
      this.nombre = "star-outline"
    }
    
    this.service.getMovie(this.id)
        .subscribe(res=>{
          this.pelicula = res;
        })
    this.service.getActoresPelicula(this.id)
        .subscribe(res=>{
          this.actores = res.cast;
        })
    
  }


  regresar(){
    this.modal.dismiss({
      'dismissed':true
    })
  }

  favorito(){
    let guardo = this.dataLocal.guardarPelicula(this.pelicula)
    if(guardo){
      this.nombre = "star-outline"
    }else{
      this.nombre = "star"

    } 
  }

}
