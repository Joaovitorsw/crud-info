export const authPageEmailDataTestID = 'email';
export const authPagePasswordDataTestID = 'password';
export const authPageSubmitDataTestID = 'submit';
export const authPageRouterLink = 'router-link';
export const getAuthPageEmailInput = () =>
  cy.get<HTMLInputElement>(`[data-testid=${authPageEmailDataTestID}]`);
export const getAuthPagePasswordInput = () =>
  cy.get<HTMLInputElement>(`[data-testid=${authPagePasswordDataTestID}]`);
export const getAuthPageSubmitButton = () =>
  cy.get<HTMLButtonElement>(`[data-testid=${authPageSubmitDataTestID}]`);
export const getAuthPageRouterLink = () =>
  cy.get<HTMLAnchorElement>(`[data-testid=${authPageRouterLink}]`);

export const authPageUser = {
  email: 'joaovitorsw@teste.com',
  password: '123456',
};

export function loginWithDefaultUser() {
  cy.intercept('POST', 'http://localhost:5000/api/auth/sign-in').as('login');
  cy.get('h1').contains('Sing In');
  getAuthPageEmailInput().should('exist');
  getAuthPagePasswordInput().should('exist');
  getAuthPageSubmitButton().should('exist');
  getAuthPageRouterLink().should('exist');

  getAuthPageEmailInput().clear().type(authPageUser.email);
  getAuthPagePasswordInput().clear().type(authPageUser.password);
  getAuthPageSubmitButton().click();
  cy.wait('@login');
}
