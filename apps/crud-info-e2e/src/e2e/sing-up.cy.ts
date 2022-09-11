const emailDataTestID = 'email';
const passwordDataTestID = 'password';
const submitDataTestID = 'submit';
const routerLink = 'router-link';
const getEmailInput = () =>
  cy.get<HTMLInputElement>(`[data-testid=${emailDataTestID}]`);
const getPasswordInput = () =>
  cy.get<HTMLInputElement>(`[data-testid=${passwordDataTestID}]`);
const getSubmitButton = () =>
  cy.get<HTMLButtonElement>(`[data-testid=${submitDataTestID}]`);
const getRouterLink = () =>
  cy.get<HTMLAnchorElement>(`[data-testid=${routerLink}]`);

const user = {
  name: 'João Vitor Pereira dos Santos',
  email: `joaovitorsw${Math.random().toFixed(2)}@teste.com`,
  password: '123456',
};

describe('Sing In Page', () => {
  beforeEach(() => {
    cy.visit('/');
    getRouterLink().click();
  });

  it('should display auth-page and login with default user', () => {
    cy.intercept('POST', 'http://localhost:5000/api/auth/sign-up').as(
      'createUser'
    );
    cy.get('h1').contains('Sing In');
    getEmailInput().should('exist');
    getPasswordInput().should('exist');
    getSubmitButton().should('exist');
    getRouterLink().should('exist');

    getEmailInput().clear().type(user.email);
    getPasswordInput().clear().type(user.password);
    getSubmitButton().click();
    cy.wait('@createUser');
  });
});
