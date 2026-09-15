describe("Landing", () => {
  it("carrega a landing page", () => {
    cy.visit("/");
    cy.contains("Poliana").should("be.visible");
    cy.contains("Emagreça com estratégia").should("be.visible");
  });

  it("mostra o sorteio com ?sorteio=true", () => {
    cy.visit("/?sorteio=true");
    // Aumenta o timeout especificamente para essa validação (ex: 8 segundos)
    cy.get('[data-testid="sorteio-container"]').should("exist");
  });

  it("abre a página isolada /sorteio", () => {
    cy.visit("/sorteio");
    cy.get('[data-testid="sorteio-container"]').should("be.visible");
  });
});
