import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { VehicleResponse } from '@my-workspace/api-interfaces';
import { ENVIRONMENT_TOKEN } from '@my-workspace/base-api';
import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;
  const VEHICLES_MOCK = [
    {
      vehicleID: 1,
      board: 'NPC-9191',
      chassi: '9BM6953049B683969',
      renavam: '193585022',
      modelo: 'Caminhão Preto',
      marca: 'Merc. Benz Basc.',
      ano: '2009',
    },
    {
      vehicleID: 2,

      board: 'KAU-6591',
      chassi: '9BM6953049B683948',
      renavam: '193045958',
      modelo: 'Caminhão Branco',
      marca: 'Merc. Benz Basc.',
      ano: '2009',
    },
    {
      vehicleID: 3,
      board: 'JZI-3472',
      chassi: '9BD27801112797681',
      renavam: '776046489',
      modelo: 'Camionete Branco',
      marca: 'FIAT Strada.',
      ano: '2001',
    },
    {
      vehicleID: 4,
      board: 'OAX-5895',
      chassi: '9BD15822AC6650210',
      renavam: '776046489',
      modelo: 'Automóvel Branco',
      marca: 'Fiat Uno Mille Ec.',
      ano: '2011',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VehicleService,
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: {
            BASE_API_URL: 'http://localhost:5000/api/',
          },
        },
      ],
    });
    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get all vehicles', (done) => {
    service.getVehicles().subscribe((vehicles) => {
      expect(vehicles.length).toBe(VEHICLES_MOCK.length);
      done();
    });

    const req = httpMock.expectOne(`${service.BASE_URL}${service.CONTEXT}`);
    expect(req.request.method).toBe('GET');
    req.flush(VEHICLES_MOCK);
  });

  it('should be able to get vehicle by id', (done) => {
    const vehicleID = 1;
    service.getVehicleById(vehicleID).subscribe((vehicle) => {
      expect(vehicle.vehicleID).toBe(vehicleID);
      done();
    });

    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.CONTEXT}/${vehicleID}`
    );
    const vehicle = VEHICLES_MOCK.find(
      (vehicle) => vehicle.vehicleID === vehicleID
    ) as VehicleResponse;

    expect(vehicle).toBeTruthy();
    expect(req.request.method).toBe('GET');
    req.flush(vehicle);
  });

  it('should be able to create vehicle', (done) => {
    const vehicle = {
      board: 'OAX-5895',
      chassi: '9BD15822AC6650210',
      renavam: '776046489',
      modelo: 'Automóvel Branco',
      marca: 'Fiat Uno Mille Ec.',
      ano: '2011',
    } as VehicleResponse;

    service.createVehicle(vehicle).subscribe((vehicle) => {
      expect(vehicle).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(`${service.BASE_URL}${service.CONTEXT}`);
    expect(req.request.method).toBe('POST');
    req.flush(vehicle);
  });

  it('should be able to update vehicle', (done) => {
    const vehicle = {
      vehicleID: 1,
      board: 'OAX-5895',
      chassi: '9BD15822AC6650210',
      renavam: '776046489',
      modelo: 'Automóvel Branco',
      marca: 'Fiat Uno Mille Ec.',
      ano: '2011',
    } as VehicleResponse;

    service.updateVehicle(vehicle).subscribe((vehicle) => {
      expect(vehicle).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(`${service.BASE_URL}${service.CONTEXT}`);
    expect(req.request.method).toBe('PUT');
    req.flush(vehicle);
  });

  it('should be able to delete vehicle', (done) => {
    const vehicleID = 1;
    service.deleteVehicle(vehicleID).subscribe((vehicle) => {
      expect(vehicle).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(
      `${service.BASE_URL}${service.CONTEXT}/${vehicleID}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });
});
