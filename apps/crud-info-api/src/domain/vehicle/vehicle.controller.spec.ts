import { VehicleResponse } from '@my-workspace/api-interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './service/vehicle.service';
import { VehicleController } from './vehicle.controller';

const MOCK_VEHICLE_RESPONSE: VehicleResponse[] = [
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

describe('VehicleController', () => {
  let vehicleController: VehicleController;
  let vehicleService: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(MOCK_VEHICLE_RESPONSE),
            findOne: jest.fn().mockResolvedValue(MOCK_VEHICLE_RESPONSE[0]),
            create: jest.fn().mockResolvedValue(MOCK_VEHICLE_RESPONSE[0]),
            update: jest.fn().mockResolvedValue(MOCK_VEHICLE_RESPONSE[0]),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    vehicleController = module.get<VehicleController>(VehicleController);
    vehicleService = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(vehicleController).toBeDefined();
    expect(vehicleService).toBeDefined();
  });

  describe('getAllVehicle', () => {
    it('should return all vehicles', async () => {
      const result = await vehicleController.getAllVehicle();
      expect(result).toEqual(MOCK_VEHICLE_RESPONSE);
    });
  });

  describe('getVehicleById', () => {
    it('should return a vehicle', async () => {
      const result = await vehicleController.getVehicleById(1);
      expect(result).toEqual(MOCK_VEHICLE_RESPONSE[0]);
    });
  });

  describe('createVehicle', () => {
    it('should create a new vehicle', async () => {
      const result = await vehicleController.createVehicle({
        board: 'NPC-9191',
        chassi: '9BM6953049B683969',
        renavam: '193585022',
        modelo: 'Caminhão Preto',
        marca: 'Merc. Benz Basc.',
        ano: '2009',
      });
      expect(result).toEqual(MOCK_VEHICLE_RESPONSE[0]);
    });

    describe('updateVehicle', () => {
      it('should update a vehicle', async () => {
        const expectedUpdate = MOCK_VEHICLE_RESPONSE[0];
        expectedUpdate.board = 'OAX-5895';

        const result = await vehicleController.updateVehicle(1, {
          board: 'OAX-5895',
          chassi: '9BM6953049B683969',
          renavam: '193585022',
          modelo: 'Caminhão Preto',
          marca: 'Merc. Benz Basc.',
          ano: '2011',
        });

        expect(result).toEqual(expectedUpdate);
      });
    });

    describe('deleteVehicle', () => {
      it('should delete a vehicle', async () => {
        const result = await vehicleController.deleteVehicle(1);
        expect(result).toEqual(true);
      });
    });
  });
});
