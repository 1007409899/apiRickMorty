import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetalleepisodioComponent } from './detalleepisodio/detalleepisodio.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { ListaepisodiosComponent } from './listaepisodios/listaepisodios.component';

const routes: Routes = [

  {
    path: '',
    component:DashboardComponent,
    children: [
      { path: 'episodios',component:ListaepisodiosComponent },
      { path: 'episodios/:id',component:DetalleepisodioComponent },
      { path: 'favoritos', component: FavoritosComponent },
      { path: '**', redirectTo: 'episodios' },
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [
    RouterModule,

  ]
})
export class EpisodiosRoutingModule { }
