describe('Fluxo de Cadastro de Empresa (Manual)', () => {
  it('deve preencher o formulário manualmente, cadastrar e aparecer na listagem', () => {
    cy.intercept('POST', '**/companies').as('createCompany');
    
    cy.intercept('GET', '**/companies').as('getCompaniesAfterRedirect');

    cy.visit('/register');
    
    cy.get('input[name="cnpj"]').type('11.222.333/0001-44');
    cy.get('input[name="razaoSocial"]').type('Games & CIA LTDA');
    cy.get('input[name="nomeFantasia"]').type('Games & CIA');
    cy.get('input[name="cep"]').type('38400-000');
    cy.get('input[name="estado"]').type('MG');
    cy.get('input[name="municipio"]').type('Uberlandia');    
    cy.get('input[name="logradouro"]').type('Rua do pintor');
    cy.get('input[name="numero"]').type('2354');
    cy.get('textarea[name="complemento"]').type('Ao lado do Posto');
    
    cy.get('form').submit();
    cy.wait('@createCompany').its('response.statusCode').should('eq', 201);
    cy.url().should('eq', 'http://localhost:3000/');

    cy.wait('@getCompaniesAfterRedirect');
  });
});