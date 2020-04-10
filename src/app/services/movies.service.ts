import { PeliculaDetalle, RespuestaCredits, Genre } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaMDB } from '../interfaces/interfaces';

const url = environment.apiUri;
const api_key = environment.api_key


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularesPage=0;
  public apiUri = environment.apiUri;
  public generos:Genre[] = []

  private ejecutarQuery<T>(query:string){
    query = url + query;
    query+='&api_key='+api_key+'&language=es&include_image_language=es';
    console.log(query);
    
    return this.http.get<T>(query);
  }

  constructor(private http:HttpClient) { }

  getFeature(){
    const day = new Date();
    const ultimoDia = new Date(day.getFullYear(),day.getMonth()+1,0).getDate();
    const mes = day.getMonth()+1;

    let mesString;
    if(mes < 10){
      mesString = '0' + mes;
    }else{
      mesString = mes;
    }

    const inicio = day.getFullYear() + "-" + mesString + "-01";
    const fin = day.getFullYear() + "-" + mesString + "-" + ultimoDia;
    return this.ejecutarQuery<RespuestaMDB>('/discover/movie?primary_release_date.gte='+inicio+'&primary_release_date.lte='+fin);
  }


  getPopulares(){
    this.popularesPage++;
    const query = "/discover/movie?sort_by=popularity.desc&page="+this.popularesPage;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getMovie(id:string){
    const query = '/movie/'+id+'?a=1';
    return this.ejecutarQuery<PeliculaDetalle>(query)
  }

  getActoresPelicula(id:string){
    const query = '/movie/'+id+'/credits?a=1';
    return this.ejecutarQuery<RespuestaCredits>(query)
  }

  buscarPelicula(texto:string){
    const query = '/search/movie?query='+texto;
    return this.ejecutarQuery(query)
  }

  cargarGeneros():Promise<Genre[]>{
    return new Promise(resolve => {
      const query = '/genre/movie/list?a=1'
      this.ejecutarQuery(query)
          .subscribe(res=>{
            this.generos = res['genres']
            resolve(this.generos)
          })
    })
  }
}
