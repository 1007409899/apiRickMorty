import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Episode, resultEpisode } from '../interfaces/interfaces';
import { EpisodiosService } from '../services/episodios.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-listaepisodios',
  templateUrl: './listaepisodios.component.html',
  styleUrls: ['./listaepisodios.component.css']
})
export class ListaepisodiosComponent implements OnInit  {
  public episodes?: Episode;

  pageSize = 20;
  pageIndex = 0;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(private episodiosService:EpisodiosService,private cdRef: ChangeDetectorRef, private router:Router) { }
  ngOnInit(): void {
    this.getEpisodiosByPage(1); // Llamada explícita para cargar los episodios de la página 1 al inicio
    this.paginator.page.subscribe((event) => {
      this.pageIndex = event.pageIndex;
      this.getEpisodiosByPage(this.pageIndex + 1); // Llamada al método para cargar los episodios de la página seleccionada
    });
  }
  getEpisodiosByPage(page: number) {
    this.episodiosService.getEpisodiosByPage(page).subscribe(
      (data:any) => {
        if (data.results) {
          this.episodes = data;
          this.paginator.length = data.info.count;
          this.cdRef.detectChanges(); // forzar detección de cambios
        }else{
          this.episodes = undefined;
        }
      }
    );

}
  getInforPageEpisodios(){

  }

  markAsFavorite(episode: resultEpisode){
    console.log("episode", episode)
  }
  detailsEpisodio(episode:any){
    this.router.navigate(['/dashboard/episodios',episode.id])
  }

  buscarEpisodios(event:Event){
    const query = (event.target as HTMLInputElement).value;
    console.log("query", query)
    this.episodiosService.getEpisodiosByQueryAndPage(query,this.pageIndex).subscribe(
      (data) => {
        console.log("data", data);
        this.episodes = data;
        this.paginator.length = data.info.count;
      }
    )

  }

}
