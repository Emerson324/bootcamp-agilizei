/// <reference types = "cypress"/>

context('', () => {
    it('Listagem sem registros', () => {
                
        cy.intercept('GET', '**/api/1/databases/userdetails/collections/newtable?**', {fixture: 'listasemregistros'});

        cy.visit('WebTable.html');

        cy.get('div[role=row]').should('have.length', 1);

    });

    it('Listagem com registros', () => {

        cy.intercept('GET', '**/api/1/databases/userdetails/collections/newtable?**', {fixture: 'listacomregistros'});

        cy.visit('WebTable.html');

        cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');
        cy.get('@gridCellPhone').should('contain.text', '3129876543');
    });

    
});