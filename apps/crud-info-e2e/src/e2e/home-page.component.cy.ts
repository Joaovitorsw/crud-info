import { loginWithDefaultUser } from '../support/app.po';

const createNewVehicleButton = 'create-new-vehicle-button';
const getCreateNewVehicleButton = () =>
  cy.get<HTMLButtonElement>(`[data-testid=${createNewVehicleButton}]`);
const getBoardField = () => cy.get<HTMLInputElement>('[data-testid=board]');
const getChassiField = () => cy.get<HTMLInputElement>('[data-testid=chassi]');
const getRenavamField = () => cy.get<HTMLInputElement>('[data-testid=renavam]');
const getModeloField = () => cy.get<HTMLInputElement>('[data-testid=modelo]');
const getMarcaField = () => cy.get<HTMLInputElement>('[data-testid=marca]');
const getYearField = () => cy.get<HTMLInputElement>('[data-testid=ano]');
const getSendButton = () =>
  cy.get<HTMLButtonElement>('[data-testid=send-button]');
const getCancelButton = () =>
  cy.get<HTMLButtonElement>('[data-testid=cancel-button]');

const vehicle = {
  board: `TST-${Math.floor(Math.random() * 1000)}${Math.floor(
    Math.random() * 1000
  )}`,
  chassi: '9BM6953049B683969',
  renavam: '193585022',
  modelo: 'Caminhão Preto',
  marca: 'Merc. Benz Basc.',
  ano: `${new Date(Math.random()).getFullYear()}`,
};

describe('Home Page', () => {
  beforeEach(() => cy.visit('/'));

  it('should display home page and create new vehicle', () => {
    loginWithDefaultUser();
    cy.intercept('POST', 'http://localhost:5000/api/vehicle').as(
      'createNewVehicle'
    );
    getCreateNewVehicleButton().should('exist').click();
    getBoardField().type(vehicle.board);
    getChassiField().type(vehicle.chassi);
    getRenavamField().type(vehicle.renavam);
    getModeloField().type(vehicle.modelo);
    getMarcaField().type(vehicle.marca);
    getYearField().type(vehicle.ano);
    getSendButton().click();
    cy.wait('@createNewVehicle').its('response.statusCode').should('eq', 201);
  });

  it('should display home page and cancel create new vehicle', () => {
    loginWithDefaultUser();
    getCreateNewVehicleButton().should('exist').click();
    getCancelButton().click();
  });

  it('should display home page and delete vehicle', () => {
    loginWithDefaultUser();
    cy.intercept('DELETE', 'http://localhost:5000/api/vehicle/*').as(
      'deleteVehicle'
    );
    cy.get('[data-testid=delete-vehicle-button]').first().click();
    cy.get('[data-testid=remove-confirm-button]').click();
    cy.wait('@deleteVehicle').its('response.statusCode').should('eq', 200);
  });

  it('should display home page and cancel remove', () => {
    loginWithDefaultUser();
    cy.get('[data-testid=delete-vehicle-button]').first().click();
    cy.get('[data-testid=remove-cancel-button]').click();
  });

  it('should display home page and edit vehicle', () => {
    loginWithDefaultUser();
    cy.intercept('PUT', 'http://localhost:5000/api/vehicle').as('editVehicle');
    cy.get('[data-testid=edit-vehicle-button]').first().click();
    getBoardField().clear().type(vehicle.board);
    getChassiField().clear().type(vehicle.chassi);
    getRenavamField().clear().type(vehicle.renavam);
    getModeloField().clear().type(vehicle.modelo);
    getMarcaField().clear().type(vehicle.marca);
    getYearField().clear().type(vehicle.ano);
    getSendButton().click();
    cy.wait('@editVehicle').its('response.statusCode').should('eq', 200);
  });
});
