import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public peliculasRecientes:Pelicula[] = [];
  public populares:Pelicula[] = [];

  constructor(private service:MoviesService) {}

  
  ngOnInit(){
    this.service.getFeature()
        .subscribe(res=>{
          this.peliculasRecientes = res.results
        })
    
    this.getPopulares()
    
  }

  cargarMas(){
    this.getPopulares()
  }

  getPopulares(){
    this.service.getPopulares()
        .subscribe(res=>{
          const temp = [ ...this.populares, ...res.results ]
          this.populares = temp
        })
  }

}
