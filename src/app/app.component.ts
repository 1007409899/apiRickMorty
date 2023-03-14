import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rickMortyApp';

  spinnerVisible: boolean = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerService.spinnerVisible$.subscribe(visible => {
      this.spinnerVisible = visible;
    });
  }
}
