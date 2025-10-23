// cypress/integration/editor.spec.js
describe('Editor flow', () => {
  it('loads editor demo page', () => {
    cy.visit('/editor/demo');
    cy.contains('Editor: demo');
    cy.get('textarea, [contenteditable]').should('exist');
  });
});
