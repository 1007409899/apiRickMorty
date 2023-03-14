import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogmarkfavorito',
  templateUrl: './dialogmarkfavorito.component.html',
  styles: [
  ]
})
export class DialogmarkfavoritoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogmarkfavoritoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
