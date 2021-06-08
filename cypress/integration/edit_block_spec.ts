import { attachFile } from "../helpers";
import slideshowBlock from "../fixtures/block/slideshow.json";
import slideshowPartialBlock from "../fixtures/block/slideshow-partial.json";

const MODAL_TRANSITIONS = 400;

context("Edit Block", () => {
  beforeEach(() => {
    cy.visit("./cypress/resources/edit_block.html");
  });

  describe("Import", () => {
    it("full data", () => {
      cy.get("#import-block").click();
      attachFile("#import-file", "block/slideshow.json", "application/json");

      cy.wait(MODAL_TRANSITIONS);

      cy.get(".modal-footer .btn-primary").click();

      cy.get(`#label`).should("have.value", slideshowBlock.label);
      cy.get(`#identifier`).should("have.value", slideshowBlock.identifier);
      cy.get("#can_remove_block").should("be.checked");
      cy.get(`label[for="addable_block_types"]`).should('be.visible');
    });

    it("partial data", () => {
      cy.get("#import-block").click();
      attachFile("#import-file", "block/slideshow-partial.json", "application/json");

      cy.wait(MODAL_TRANSITIONS);

      cy.get(".modal-footer .btn-primary").click();

      cy.get(`#label`).should("have.value", "");
      cy.get(`#identifier`).should("have.value", slideshowPartialBlock.identifier);
      cy.get("#can_remove_block").should("not.be.checked");
      cy.get(`label[for="addable_block_types"]`).should('not.be.visible');
    });

    it("broken json file", () => {
      cy.get("#import-block").click();
      attachFile("#import-file", "block/broken.txt", "application/text");

      cy.wait(MODAL_TRANSITIONS);

      cy.get(".modal").should('be.visible');
      cy.get(".modal-footer .btn-primary").click();

      cy.wait(MODAL_TRANSITIONS);

      cy.get(".modal").should('not.be.visible');
      cy.get("#msg-block .alert").should('be.visible');
    });

    it("json file that has additional props", () => {
      cy.get("#import-block").click();
      attachFile("#import-file", "block/slideshow-additional.json", "application/text");

      cy.wait(MODAL_TRANSITIONS);

      cy.get(".modal").should('be.visible');
      cy.get(".modal-footer .btn-primary").click();

      cy.wait(MODAL_TRANSITIONS);

      cy.get(".modal").should('not.be.visible');
      cy.get("#msg-block .alert").should('be.visible');
    });
  });
});
