import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DialogmarkfavoritoComponent } from '../components/dialogmarkfavorito/dialogmarkfavorito.component';
import { Character, Episode, resultEpisode } from '../interfaces/interfaces';
import { EpisodiosService } from '../services/episodios.service';

@Component({
  selector: 'app-detalleepisodio',
  templateUrl: './detalleepisodio.component.html',
  styleUrls: ['./detalleepisodio.component.css']
})
export class DetalleepisodioComponent implements OnInit {
  episode!: resultEpisode;
  characters!: Character[];

  constructor(
    private route: ActivatedRoute,
    private episodiosService: EpisodiosService,
    private http: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    const episodeId = +this.route.snapshot.paramMap.get('id')!;
    console.log(episodeId);

    // Obtener los detalles del episodio y los personajes que aparecen en él
    setTimeout(() => {
      this.episodiosService.getEpisodio(episodeId).subscribe((data) => {
        this.episode = data;

        // Obtener los detalles de los personajes que aparecen en el episodio
        const characterUrls = this.episode.characters;
        const characterRequests = characterUrls.map(url => this.http.get(url));
        forkJoin(characterRequests).subscribe((characters: any) => {
          // Almacenar los detalles de los personajes en los detalles del episodio
          this.characters = characters;
        });
      });
    }, 100); // espera 500 milisegundos (0.5 segundos) antes de hacer la petición
  }
  MarkFavoritOpenDialog(character: Character) {
    const dialogRef = this.dialog.open(DialogmarkfavoritoComponent, {
      data: { name: character.name, id: character.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result.id) {
        this.MarkFavoritoService(result.id, result.observacion)
      }
    });

  }

  MarkFavoritoService(idPersonaje: number, observaciones: string) {
    this.episodiosService.markToFavorite(idPersonaje, observaciones).subscribe(
      (data) => {
        if (data.description) {
          this.mostrarSnakbar(data.description, "Exito!");
          console.log("data", data);
          this.episodiosService.getFavoritosLength().subscribe(res => {
            console.log("res desde detalle", res)

          }
          )
        } else {
          this.mostrarSnakbar(data, 'Error!');
        }
      }
    )
  }


  mostrarSnakbar(mensaje: string , msg:string) {
    this.snackBar.open(mensaje, msg, {
      duration: 2500,
    });
  }


}

