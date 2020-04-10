import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  public peliculas:PeliculaDetalle[] = [];
  constructor( private storage:Storage, private toastController:ToastController ) { 
    this.cargarFavoritos()
  }

  guardarPelicula( pelicula:PeliculaDetalle ){
    let existe = false;
    let mensaje = "";

    for (const peli of this.peliculas) {
        if(peli.id === pelicula.id){
          existe = true;
          break;
        }
    }

    if( existe ){
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id )
      mensaje = "Película removida de favoritos"
    }else{
      this.peliculas.push(pelicula)
      mensaje = "Película agregada a favoritos";
    }
    this.presentToast(mensaje)
    this.storage.set('peliculas',this.peliculas);

    return existe;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async cargarFavoritos(){
    const peliculas = await this.storage.get('peliculas')
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id){
    id = Number(id);

    await this.cargarFavoritos()

    const existe = this.peliculas.find(peli=>peli.id === id)

    return (existe) ? true : false;
  }

}
