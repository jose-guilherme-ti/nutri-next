describe("Página de Sorteio", () => {
  beforeEach(() => {
    cy.visit("/sorteio");
  });

  it("exibe o formulário inicial", () => {
    cy.get('[data-testid="sorteio-container"]').should("be.visible");
    cy.get('[data-testid="url-input"]').should("be.visible");
    cy.get('[data-testid="buscar-btn"]').should("contain", "Buscar");
    cy.contains("Cole a URL de um post do Instagram para começar").should(
      "be.visible"
    );
  });

  it("mostra erro ao buscar sem URL", () => {
    cy.get('[data-testid="buscar-btn"]').click();
    cy.get('[data-testid="error-message"]').should(
      "contain",
      "Cole a URL do post"
    );
  });

  it("permite digitar a URL do Instagram", () => {
    const url = "https://www.instagram.com/p/DdFpla0AjYW";
    cy.get('[data-testid="url-input"]').type(url).should("have.value", url);
  });

  it("intercepta a API e lista participantes (mock)", () => {
    cy.intercept("POST", "**/api/comments", {
      statusCode: 200,
      body: {
        participants: [
          {
            username: "livialima_lyu",
            profilePic: null,
            fullName: null,
          },
          {
            username: "karine.marques60",
            profilePic: null,
            fullName: null,
          },
          {
            username: "nutripolianacampos",
            profilePic: null,
            fullName: null,
          },
        ],
        total: 3,
      },
    }).as("getComments");

    cy.get('[data-testid="url-input"]').type(
      "https://www.instagram.com/p/DdFpla0AjYW"
    );
    cy.get('[data-testid="buscar-btn"]').click();

    cy.wait("@getComments");

    cy.get('[data-testid="participants-section"]').should("be.visible");
    // nutripolianacampos deve ser filtrado no frontend
    cy.get('[data-testid="participants-count"]').should("contain", "2 únicos");
    cy.get('[data-testid="participant-livialima_lyu"]').should("exist");
    cy.get('[data-testid="participant-nutripolianacampos"]').should(
      "not.exist"
    );
  });

  it("sorteia um vencedor após listar participantes", () => {
    cy.intercept("POST", "**/api/comments", {
      statusCode: 200,
      body: {
        participants: [
          { username: "user_a", profilePic: null, fullName: null },
          { username: "user_b", profilePic: null, fullName: null },
        ],
        total: 2,
      },
    }).as("getComments");

    cy.get('[data-testid="url-input"]').type(
      "https://www.instagram.com/p/test"
    );
    cy.get('[data-testid="buscar-btn"]').click();
    cy.wait("@getComments");

    cy.get('[data-testid="sortear-btn"]').click();
    cy.get('[data-testid="winner-box"]', { timeout: 5000 }).should(
      "be.visible"
    );
    cy.get('[data-testid="winner-box"]').should("contain", "@");
  });
});
