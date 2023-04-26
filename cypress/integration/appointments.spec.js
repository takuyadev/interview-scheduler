describe("Appointments", () => {
   // Reset database, then use requested data to render homepage
   beforeEach(() => {
      cy.request("GET", "http://localhost:8001/api/debug/reset");
      cy.visit("/");
   });

   it("should book an interview", () => {
      cy.get("[data-testid=add]").click();
      cy.get("[data-testid=student-name-input").type("John Doe");
      cy.get("[alt='Sylvia Palmer']").first().click();
      cy.get("[data-testid=save").click();
      cy.get("[data-testid=appointment").contains("John Doe");
   });

   it("should edit an interview", () => {
      cy.get("[data-testid=appointment]").first().find("[data-testid=edit]").click({ force: true });
      cy.get("[data-testid=student-name-input").clear();
      cy.get("[data-testid=student-name-input").type("Garfield Arbuckle");
      cy.get("[data-testid=save").click();
      cy.contains("Garfield Arbuckle");
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
});
