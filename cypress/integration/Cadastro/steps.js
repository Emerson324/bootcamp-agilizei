/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();
// implementação dos passos descritos na feature



When(/^informar os meus dados$/, () => {
	cy.get('input[placeholder="First Name"]').type(chance.first());
    cy.get('input[ng-model^=Last]').type(chance.last());
    cy.get('input[ng-model^=Email]').type(chance.email());
    cy.get('input[ng-model^=Phone]').type(chance.phone({formatted: false}));

    //check --> utilizado para interagir radio's e checkboxs
    cy.get('input[value=FeMale]').check();
    cy.get('input[type=checkbox]').check('Cricket');
    cy.get('input[type=checkbox]').check('Hockey');

    // select --> interagir com select & select2
    cy.get('select#Skills').select('Javascript');
    cy.get('select#countries').select('Argentina');
    cy.get('select#country').select('Netherlands', {force: true});
    cy.get('select#yearbox').select('1992');
    cy.get('select[ng-model^=month]').select('March');
    cy.get('select#daybox').select('5');
    cy.get('input[ng-model=Password]').type('Aa#12345');
    cy.get('input[ng-model=CPassword]').type('Aa#12345');

    // attachFile --> input file
    cy.get('input#imagesrc').attachFile('imagem.PNG');
});

When(/^salvar$/, () => {
	// click
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
	cy.wait('@postNewtable').then((resNewtable) => {
        // com o intercept
        expect(resNewtable.response.statusCode).to.eq(200)
      })   

    cy.wait('@postUsertable').then((resUsertable) => {
      // com o intercept
      expect(resUsertable.response.statusCode).to.eq(200)
    })

    cy.wait('@getNewtable').then((resNewtable) => {
      // com o intercept
      expect(resNewtable.response.statusCode).to.eq(200)
    })
    
    cy.url().should('contain', 'WebTable');
});

