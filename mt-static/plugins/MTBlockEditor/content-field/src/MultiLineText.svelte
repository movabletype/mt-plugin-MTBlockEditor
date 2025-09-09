<script lang="ts">
  import { Writable } from "svelte/store";

  import { ContentFieldOption, ContentFieldOptionGroup } from "@sixapart/mt-toolkit/contenttype";
  import type { ConfigSettings, Field, OptionsHtmlParams } from "@sixapart/mt-toolkit/contenttype";
  import type { MultiLineTextOptions } from "./type";

  // svelte-ignore unused-export-let
  export let config: ConfigSettings;
  export let fieldIndex: number;
  export let fieldsStore: Writable<Array<Field<MultiLineTextOptions>>>;
  // svelte-ignore unused-export-let
  export let optionsHtmlParams: OptionsHtmlParams;

  const id = `field-options-${$fieldsStore[fieldIndex].id}`;

  $fieldsStore[fieldIndex].options.full_rich_text ??= true;
  if (($fieldsStore[fieldIndex].options.full_rich_text as any) === "0") {
    // backward compatibility: convert "0" to false
    $fieldsStore[fieldIndex].options.full_rich_text = false;
  }
  $fieldsStore[fieldIndex].options.initial_value ??= "";

  const textFilters: Array<{ filter_label: string; filter_key: string }> =
    optionsHtmlParams.multi_line_text.text_filters;

  const placeholderElm = document.querySelector<HTMLElement>(
    "#mt-block-editor-content-field"
  ) as HTMLElement;
  const configs: Array<{ id: string; label: string }> = JSON.parse(
    placeholderElm.dataset.mtBlockEditorConfigs as string
  ) as { id: string; label: string }[];
  const configLabel = placeholderElm.dataset.mtBlockEditorConfigLabel as string;

  // changeStateFullRichText was removed because unused
</script>

<ContentFieldOptionGroup
  type="multi-line-text"
  bind:field={$fieldsStore[fieldIndex]}
  {id}
  bind:options={$fieldsStore[fieldIndex].options}
>
  <ContentFieldOption id="multi_line_text-initial_value" label={window.trans("Initial Value")}>
    <textarea
      {...{ ref: "initial_value" }}
      name="initial_value"
      id="multi_line_text-initial_value"
      class="form-control"
      bind:value={$fieldsStore[fieldIndex].options.initial_value}
    ></textarea>
  </ContentFieldOption>

  <ContentFieldOption id="multi_line_text-input_format" label={window.trans("Input format")}>
    <!-- selected was removed and bind is used -->
    <select
      {...{ ref: "input_format" }}
      name="input_format"
      id="multi_line_text-input_format"
      class="custom-select form-control form-select"
      bind:value={$fieldsStore[fieldIndex].options.input_format}
    >
      {#each textFilters as filter}
        <option value={filter.filter_key}>{filter.filter_label}</option>
      {/each}
    </select>
  </ContentFieldOption>

  <ContentFieldOption
    id="multi_line_text-full_rich_text"
    label={window.trans("Use all rich text decoration buttons")}
  >
    <!-- onclick was removed and bind is used -->
    <input
      {...{ ref: "full_rich_text" }}
      type="checkbox"
      class="mt-switch form-control"
      id="multi_line_text-full_rich_text"
      name="full_rich_text"
      bind:checked={$fieldsStore[fieldIndex].options.full_rich_text}
    /><label for="multi_line_text-full_rich_text" class="form-label">
      {window.trans("Use all rich text decoration buttons")}
    </label>
  </ContentFieldOption>

  <ContentFieldOption id="multi_line_text-be_config" label={configLabel}>
    <!-- selected was removed and bind is used -->
    <select
      {...{ ref: "be_config" }}
      name="be_config"
      id="multi_line_text-be_config"
      class="custom-select form-control form-select"
      bind:value={$fieldsStore[fieldIndex].options.be_config}
    >
      {#each configs as config}
        <option value={config.id}>{config.label}</option>
      {/each}
    </select>
  </ContentFieldOption>
</ContentFieldOptionGroup>
