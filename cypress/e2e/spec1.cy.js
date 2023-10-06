describe('Test Lab selection tabs', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getDataTest('login-button').click();
    cy.getDataTest('login-form').within(() => {
      cy.get('input[type="email"]').type('user@test.com');
      cy.get('input[type="password"]').type('tester123');
      cy.get('input[type="submit"]').click();
      cy.wait(1000);
    });
    cy.contains('Welcome, Tester!');
  });
  it('Successfully opens individual lab and user study pages', () => {
    cy.getDataTest('lab-select').within(() => {
      cy.get('a').contains('Hackensack').click();
    });
    cy.contains('Hackensack Lab');
    cy.wait(500);

    cy.visit('/dashboard');
    cy.getDataTest('lab-select').within(() => {
      cy.get('a').contains('Hackensack CPAP').click();
    });
    cy.contains('Hackensack CPAP Setups');
    cy.wait(500);

    cy.visit('/dashboard');
    cy.getDataTest('lab-select').within(() => {
      cy.get('a').contains('Wayne').click();
    });
    cy.contains('Wayne Lab');
    cy.wait(500);

  })
  // it('Successfully opens Hackensack CPAP tab', () => {
  //   cy.visit('studies/hackensack-cpap');
  //   cy.contains('Hackensack CPAP Setups');
  // });
})