import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, tap } from 'rxjs';
import { User, UserDTO } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Favoritos } from '../interfaces/interfaces';
import { EpisodiosService } from '../services/episodios.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent  {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  user_Name!: UserDTO;
  cantidadEpisodios$:number = 0

  get usuario(){
     return this.authService.usuario;
  }

  constructor(private observer: BreakpointObserver, private router: Router, private authService: AuthService, public episodiosService:EpisodiosService) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), )
      .subscribe((res:any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(

        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  ngOnInit(): void {
this.getCantidadFavoritos()
    const token = localStorage.getItem('token');
    const payload = token!.split('.');
    const decodedPayload = JSON.parse((atob(payload[1])));
    const userData = JSON.parse(decodedPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']);
    const uniqueName = decodedPayload.unique_name;
    const name = userData.Nombre;
    this.user_Name = userData;
    const name1 = userData.Identificacion;


    console.log("userData",userData)
    console.log('user_Name:', this.user_Name);
    console.log('Unique name:', uniqueName);
    console.log('Name:', name);
    console.log('documento:', name1);

  }

  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/auth/login')

  }
  getCantidadFavoritos(){
    return this.episodiosService.getFavoritosLength().subscribe(res => {
      console.log(res)
      this.cantidadEpisodios$ = this.episodiosService.cantidadFavoritos
    }
    )
  }

}

