//passos comuns a mais de uma feature

Given(/^que acesso o site$/, () => {
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
});