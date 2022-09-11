import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VehicleResponse } from '@my-workspace/api-interfaces';
import { NgxMaskModule } from 'ngx-mask';
import { VehicleService } from '../../../services/vehicle/vehicle.service';

@Component({
  selector: 'my-workspace-vehicle-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    NgxMaskModule,
    MatDialogModule,
  ],
  providers: [NgxMaskModule],
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss'],
})
export class VehicleDialogComponent implements OnInit {
  vehicleForm = new FormGroup({
    board: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    chassi: new FormControl('', [
      Validators.required,
      Validators.minLength(17),
      Validators.maxLength(17),
    ]),
    renavam: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]),
    modelo: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    ano: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: VehicleResponse,
    readonly vehicleService: VehicleService,
    readonly matDialogRef: MatDialogRef<VehicleDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.vehicleForm.patchValue(this.data);
    }
  }

  sendData() {
    if (this.vehicleForm.valid) this.matDialogRef.close(this.vehicleForm.value);
  }
}
