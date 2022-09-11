/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MyHotToastService } from 'apps/crud-info/src/app/core/services/hot-toast/hot-toast.service';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { VehicleDialogComponent } from '../components/vehicle-dialog/vehicle-dialog.component';
import { VehicleTableComponent } from '../components/vehicle-table/vehicle-table.component';
@Component({
  selector: 'my-workspace-home',
  standalone: true,
  imports: [
    CommonModule,
    VehicleTableComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    VehicleDialogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(VehicleTableComponent)
  readonly vehicleTableComponent: VehicleTableComponent;
  constructor(
    readonly authService: AuthService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly vehicleService: VehicleService,
    private readonly myHotToastService: MyHotToastService
  ) {}

  logout() {
    this.router.navigate(['/auth']);
    sessionStorage.removeItem('loginRequest');
    this.myHotToastService.warning('Logout realizado com sucesso!');
  }
  createNewVehicle() {
    this.matDialog
      .open(VehicleDialogComponent, {
        width: '80%',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.vehicleService.createVehicle(result).subscribe((response) => {
            this.myHotToastService.success('Veículo criado com sucesso!');
            this.vehicleTableComponent.createDataSource();
          });
        }
      });
  }
}
