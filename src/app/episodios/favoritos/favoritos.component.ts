import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Favoritos } from '../interfaces/interfaces';
import { EpisodiosService } from '../services/episodios.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']

})
export class FavoritosComponent implements OnInit {
  public favoritos: Favoritos[] = []
  public mensajeFavoritos ="No se encontraron favoritos para el usuario!"
  public mostrarFavoritos= false;

  constructor(private episodiosService: EpisodiosService) { }

  ngOnInit(): void {
    this.getFavoritos()
  }


  getFavoritos() {
    this.episodiosService.getFavoritos().subscribe(
      (resp: any) => {
        this.favoritos = resp

        if(this.favoritos.length <= 0){
          this.mostrarFavoritos= true
        }
        console.log(this.favoritos);


        // Obtener las imágenes de todos los personajes
        const observables = this.favoritos.map((favorito) =>
          this.episodiosService.getCharactersById(favorito.id_caracter)
        );
        console.log("observables",observables);
        forkJoin(observables).subscribe(
          (personajes: any[]) => {
            personajes.forEach((personaje, index) => {
              this.favoritos[index].imagen = personaje.image;
              this.favoritos[index].name = personaje.name;
            });
          }
        );

  }
     )
}

}
