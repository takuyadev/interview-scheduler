describe("Application navigation", () => {
   // Reset database, then use requested data to render homepage
   beforeEach(() => {
      cy.request("GET", "http://localhost:8001/api/debug/reset");
      cy.visit("/");
   });

   it("should navigate to Tuesday", () => {
      cy.contains("[data-testid=day]", "Tuesday").click();
      cy.should("have.class", "day-list__item--selected");
   });
});
