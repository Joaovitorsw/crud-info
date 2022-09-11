/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { VehicleResponse } from '@my-workspace/api-interfaces';
import { MyHotToastService } from 'apps/crud-info/src/app/core/services/hot-toast/hot-toast.service';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { RemoveConfirmationComponent } from '../remove-confirmation/remove-confirmation.component';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';

@Component({
  selector: 'my-workspace-vehicle-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    VehicleDialogComponent,
    MatDialogModule,
    RemoveConfirmationComponent,
  ],
  templateUrl: './vehicle-table.component.html',
  styleUrls: ['./vehicle-table.component.scss'],
})
export class VehicleTableComponent implements OnInit {
  data: VehicleResponse[];
  sortedData: VehicleResponse[];
  sort: Sort;
  innerWidth: number;
  constructor(
    private readonly vehicleService: VehicleService,
    readonly authService: AuthService,
    readonly myHotToastService: MyHotToastService,
    private readonly matDialog: MatDialog
  ) {}

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
  dataSource$$: BehaviorSubject<VehicleResponse[]> = new BehaviorSubject<
    VehicleResponse[]
  >([]);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      sessionStorage.setItem('token', user.accessToken);
    });

    fromEvent(window, 'resize').subscribe(() => {
      this.innerWidth = window.innerWidth;
    });

    this.createDataSource();
  }
  createDataSource() {
    this.vehicleService.getVehicles().subscribe((data) => {
      data.sort((a, b) => b.vehicleID - a.vehicleID);
      this.dataSource$$.next(data);
      if (this.sort) return this.sortData(this.sort);
      this.sortedData = data;
    });
  }
  sortData(sort: Sort) {
    this.sort = sort;
    const data = this.dataSource$$.value.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    data.sort((a, b) => {
      return this.sortByColumn(sort, a, b);
    });

    this.sortedData = data;
  }
  private sortByColumn(sort: Sort, a: VehicleResponse, b: VehicleResponse) {
    const isAsc = sort.direction === 'asc';
    const propertyCompare = sort.active as keyof VehicleResponse;
    return this.compare(a[propertyCompare], b[propertyCompare], isAsc);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  editVehicle(element: VehicleResponse, event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.matDialog
      .open(VehicleDialogComponent, {
        width: '80%',
        data: element,
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          data.vehicleID = +element.vehicleID;
          this.vehicleService
            .updateVehicle(data)
            .subscribe((vehicleUpdateData) => {
              this.myHotToastService.success(
                `O Veiculo com o ID ${vehicleUpdateData.vehicleID} foi editado com sucesso`
              );
              this.createDataSource();
            });
        }
      });
  }
  removeVehicle(element: VehicleResponse, event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.matDialog
      .open(RemoveConfirmationComponent, {
        width: '50%',
        data: element.vehicleID,
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.vehicleService.deleteVehicle(data).subscribe(() => {
            this.myHotToastService.success(
              `O Veiculo com o ID ${data} foi removido com sucesso`
            );
            this.createDataSource();
          });
        }
      });
  }
}
