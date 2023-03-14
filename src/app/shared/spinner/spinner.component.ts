import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner-service.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  spinnerVisible: boolean = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerService.spinnerVisible$.subscribe(visible => {
      this.spinnerVisible = visible;
    });
  }


}
