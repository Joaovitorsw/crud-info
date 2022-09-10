import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-workspace-vehicle-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-table.component.html',
  styleUrls: ['./vehicle-table.component.scss'],
})
export class VehicleTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
