import $ from "jquery";
import { serializeBlockPreferences, unserializeBlockPreferences } from "./util";

$("#block_display_options-list").sortable({
  items: ".sort-enabled",
  placeholder: "placeholder",
  distance: 3,
  opacity: 0.8,
  cursor: "move",
  forcePlaceholderSize: true,
  handle: window.MT.Util.isMobileView() ? ".col-auto:first-child" : false,
  update: serializeBlockPreferences,
});

unserializeBlockPreferences();
serializeBlockPreferences();
document
  .querySelectorAll("#block_display_options-list input")
  .forEach((elm) => elm.addEventListener("change", serializeBlockPreferences));
