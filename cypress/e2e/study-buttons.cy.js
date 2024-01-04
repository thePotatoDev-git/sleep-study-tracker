describe('Testing study buttons', () => {
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

    it('Complete/Incomplete Button tests', () => {
        cy.visit('/studies/hackensack');
        cy.getDataTest('study-row').first().within(() => {
          cy.get('td').eq(7).should('have.class', 'techIncomplete').click();
          cy.get('td').eq(7).should('have.class', 'techComplete');
          cy.wait(1000);
          cy.get('td').eq(7).should('have.class', 'techComplete').click();
          cy.get('td').eq(7).should('have.class', 'techIncomplete');
          cy.get('td').eq(8).should('have.class', 'osaNegative').click();
          cy.get('td').eq(8).should('have.class', 'osaPositive');
          cy.get('td').eq(8).should('have.class', 'osaPositive').click();
          cy.get('td').eq(8).should('have.class', 'osaNegative');
        });
      });

      it.only('View, edit, delete button tests', () => {
        cy.visit('/studies/hackensack');
        cy.getDataTest('study-row').first().within(() => {
          cy.get('td').eq(9).within(() => {
            cy.get('i').eq(0).click(); // View study button
          });
        });
        cy.contains("O'Brien, Conan");

        cy.visit('/studies/hackensack');
        cy.getDataTest('study-row').first().within(() => {
          cy.get('td').eq(9).within(() => {
            cy.get('i').eq(1).click(); // Edit study button
          });
        });
        cy.contains("Edit Study");
      });
});