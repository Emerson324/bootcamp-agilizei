/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        // rotas
        // GET  200 https://api.mlab.com/api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        // POST 200 https://api.mlab.com/api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        // POST 200 https://api.mlab.com/api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        
        cy.intercept('POST', '**/api/1/databases/userdetails/collections/newtable?**', {
            statusCode: 200,
            body: {}
          }).as('postNewtable');
      
        cy.intercept('POST', '**/api/1/databases/userdetails/collections/usertable?**', {
          statusCode: 200, 
          body: {}
        }).as('postUsertable');
    
        cy.intercept('GET', '**/api/1/databases/userdetails/collections/newtable?**', {
          statusCode: 200,
          body: {}
        }).as('getNewtable');
        
        //baseUrl + Register.html
        cy.visit('Register.html');

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

        // click
        cy.get('button#submitbtn').click();

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
});

// elementos
// input[placeholder="First Name"]
// input[ng-model^=Last]
// input[ng-model^=Email]
// input[ng-model^=Phone]
// input[value=FeMale]
// input[type=checkbox]
// select#Skills    
// select#countries
// select#country
// select#yearbox
// select[ng-model^=month]
// select#daybox
// input[ng-model=Password]
// input[ng-model=CPassword]