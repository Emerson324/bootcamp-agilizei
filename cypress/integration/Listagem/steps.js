/// <reference types = "cypress"/>

Given(/^que o site não possui registros$/, () => {
	cy.intercept('GET', '**/api/1/databases/userdetails/collections/newtable?**', {fixture: 'listasemregistros'});
});

When(/^acessar a listagem$/, () => {
	cy.visit('WebTable.html');
});

Then(/^devo visualizar a listagem vazia$/, () => {
	cy.get('div[role=row]').should('have.length', 1);
});

Given(/^que o site possui apenas um registros$/, () => {
	cy.intercept('GET', '**/api/1/databases/userdetails/collections/newtable?**', {fixture: 'listacomregistros'});
});

Then(/^devo visualizar apenas um registro$/, () => {
	cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');
    cy.get('@gridCellPhone').should('contain.text', '3129876543');
});
