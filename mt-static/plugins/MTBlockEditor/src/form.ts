export function initMtValidate(): void {
  jQuery.mtValidateAddRules({
    ".be-validate-alnum-underscore": function ($e) {
      return $e.val().match(new RegExp(`^[a-zA-Z0-9_]+$`));
    },
  });
  jQuery.mtValidateAddMessages({
    ".be-validate-alnum-underscore": window.trans(
      "This field must be filled in with letters, numbers, or underscores."
    ),
  });
}
