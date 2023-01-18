Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Tércio')
    cy.get('#lastName').type('Sodré Campos')
    cy.get('#email').type('tercio@mail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})