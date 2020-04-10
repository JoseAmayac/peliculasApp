import { Genre } from './../interfaces/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  public peliculas:PeliculaDetalle[] = [];
  public generos:Genre[] = [];
  @Input() cerrada;

  public peliGeneros:any[] = [{
    genero:'',
    pelis:[]
  }];
  constructor( private service:DataLocalService, private movieService:MoviesService ) {}

  async ionViewWillEnter(){
    this.peliculas = await this.service.cargarFavoritos();
    this.generos = await this.movieService.cargarGeneros();
    this.filtrarPelisGenero(this.generos,this.peliculas);

  }

  filtrarPelisGenero(generos:Genre[],peliculas:PeliculaDetalle[]){
    this.peliGeneros = [];
    generos.forEach(genero => {
      this.peliGeneros.push({
        genero:genero.name,
        pelis:peliculas.filter(peli=>{
          return peli.genres.find( genre => genre.id === genero.id)
        })
      })
    }) 
  }

  refrescar(){
    this.ionViewWillEnter()
  }
}
