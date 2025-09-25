describe("Fluxo de Listagem de Empresas", () => {
  it("deve exibir a lista de empresas e abrir o modal de rendimento ao clicar em um card", () => {
    cy.intercept("GET", "**/companies").as("getCompanies");

    cy.visit("/");

    cy.wait("@getCompanies");

    cy.get('[data-cy^="company-card-"]').should("have.length.greaterThan", 0);

    cy.intercept("GET", "**/companies/cnpj/*").as("getRevenue");

    cy.get('[data-cy^="company-card-"]').first().click();

    cy.wait("@getRevenue");

    cy.get('[data-cy="revenue-modal"]').should("be.visible");

    cy.get('[data-cy="revenue-value"]').contains("R$");
  });
});
