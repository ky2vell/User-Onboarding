describe('Test form inputs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Input name into name input', () => {
    cy.get('#name').type('Kyle Lovell').should('have.value', 'Kyle Lovell');
    cy.get('[type="email"]').type('poop@aol.com');
    cy.get('[type="password"]').type('abc123123');
    cy.get('.form-check-input').check().should('be.checked');
    cy.contains('Submit').click();
  });
  it('Check validation message on invalid input', () => {
    cy.get('input:invalid').should('have.length', 0);
    cy.get('[type="email"]').type('not_an_email');
    cy.contains('Submit').click();
    cy.get('input:invalid').should('have.length', 1);
    cy.get('[type="email"]').then($input => {
      expect($input[0].validationMessage).to.eq(
        `Please include an '@' in the email address. 'not_an_email' is missing an '@'.`
      );
    });
  });
});
