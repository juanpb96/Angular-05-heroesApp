import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [
  ]
})
export class ConfirmComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ConfirmComponent>,
               // Get data from the component that invokes it, when public, you can access it in the html
               @Inject(MAT_DIALOG_DATA) public data: Hero ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  delete() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
