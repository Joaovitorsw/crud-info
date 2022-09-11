import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'my-workspace-remove-confirmation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './remove-confirmation.component.html',
  styleUrls: ['./remove-confirmation.component.scss'],
})
export class RemoveConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: number,
    readonly matDialogRef: MatDialogRef<RemoveConfirmationComponent>
  ) {}

  confirm() {
    this.matDialogRef.close(this.data);
  }
}
