export function attachFile(selector, filename, contentType) {
  const alias = Math.random().toString(32).substring(2);
  cy.fixture(filename).as(alias);
  cy.get("#import-file").then(function ($input) {
    const input = $input[0];
    const blob = new Blob([JSON.stringify(this[alias])]);
    const file = new File([blob], filename, {
      type: contentType,
    });
    const list = new DataTransfer();
    list.items.add(file);

    input.files = list.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
