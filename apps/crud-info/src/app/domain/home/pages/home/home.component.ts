import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { VehicleResponse } from '@my-workspace/api-interfaces';
import { map } from 'rxjs';

@Component({
  selector: 'my-workspace-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

  displayedColumns: string[] = [
    'vehicleID',
    'placa',
    'chassi',
    'renavam',
    'modelo',
    'marca',
    'ano',
    'edit',
    'delete',
  ];
  dataSource$ = this.http
    .get<VehicleResponse[]>('http://localhost:5000/api/vehicle', {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImVtYWlsIjoiam9hb3ZpdG9yc3dAdGVzdGUuY29tIiwibmFtZSI6Ikpvw6NvIFZpdG9yIiwiaWF0IjoxNjYyODQ1ODk2LCJleHAiOjE2NjI4NDk0OTZ9.99zq0xONoaJURpWvoIDmUHS-T4Rkz85EONq5CwPEV0Y',
      },
    })
    .pipe(
      map((data) => {
        if (!data) {
          return [];
        }
        return data;
      })
    );
}
