/// <reference types="Cypress" />
    
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT');
    })

    it('Preencher os campos obrigatórios e envia o formulário', function() {
        const textolongo = "Teste de escrita durante realização de testes"

        cy.get('#firstName').type('Tércio')
        cy.get('#lastName').type('Campos')
        cy.get('#email').type('tercio@mail.com')
        cy.get('#open-text-area').type(textolongo, {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formataçÃO', function(){
        cy.get('#firstName').type('Tércio')
        cy.get('#lastName').type('Campos')
        cy.get('#email').type('tercio@mail,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Campo telefônico continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
            .type('abdcefgh')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Tércio')
        cy.get('#lastName').type('Campos')
        cy.get('#email').type('tercio@mail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Tércio')
            .should('have.value', 'Tércio')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Sodré Campos')
            .should('have.value', 'Sodré Campos')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('tercio@mail.com')
            .should('have.value', 'tercio@mail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
            })


    // it('seleciona um produto aleatório por seu texto', function () {
    //     cy.get('#product')
    //         .its('length', {log: false}).then(n => {
    //         cy.get('#product').select(Cypress._.random(n+3))
    //  })
    // })

    it('marca o tipo de atendimento "Feedback', function () {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de elemento', function () {
        cy.get('input[type="radio"')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
        .check()
        .get('input[value="phone"]')
        .uncheck()
        .should('not.be.checked')
    })



