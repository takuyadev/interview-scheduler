describe("Navigation", () => {
   beforeEach(() => {
      cy.visit("/")
      cy.request("GET", "http://localhost:8001/api/debug/reset");
   });

   it("should navigate to Tuesday", () => {
      cy.contains("[data-testid=day]", "Tuesday").click();
      cy.should("have.class", "day-list__item--selected");
   });

   it("should book an interview", () => {
      cy.get("[data-testid=add]").click();
      cy.get("[data-testid=student-name-input").type("John Doe");
      cy.get("[alt='Sylvia Palmer']").first().click();
      cy.get("[data-testid=save").click();
      cy.get("[data-testid=appointment").contains("John Doe");
   });

   it("should cancel an interview", () => {
      cy.get("[data-testid=appointment]")
         .contains("Archie Cohen")
         .parent()
         .parent()
         .find("[data-testid=delete]")
         .click({ force: true });
      cy.get("[data-testid=confirm]").click();
   });

   it("should edit an interview", () => {
      cy.get("[data-testid=appointment]").first().find("[data-testid=edit]").click({ force: true });
      cy.get("[data-testid=student-name-input").clear();
      cy.get("[data-testid=student-name-input").type("Garfield Arbuckle");
      cy.get("[data-testid=save").click();
      cy.contains("Garfield Arbuckle");
   });
});
