import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EpisodiosRoutingModule } from './episodios-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ListaepisodiosComponent } from './listaepisodios/listaepisodios.component';
import { DetalleepisodioComponent } from './detalleepisodio/detalleepisodio.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DialogmarkfavoritoComponent } from './components/dialogmarkfavorito/dialogmarkfavorito.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ListaepisodiosComponent,
    DetalleepisodioComponent,
    FavoritosComponent,
    DialogmarkfavoritoComponent,
  ],
  imports: [
    CommonModule,
    EpisodiosRoutingModule,
    MaterialModule,
    FormsModule,


    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule
  ]
})
export class EpisodiosModule { }
