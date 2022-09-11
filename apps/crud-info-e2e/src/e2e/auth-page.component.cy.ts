import { getAuthPageRouterLink, loginWithDefaultUser } from '../support/app.po';

describe('Sing Up Page', () => {
  beforeEach(() => cy.visit('/'));

  it('should display auth-page and login with default user', () => {
    loginWithDefaultUser();
  });

  it('should redirects user to sing-up page', () => {
    getAuthPageRouterLink().click();
    cy.url().should('include', '/sing-in');
  });
});
