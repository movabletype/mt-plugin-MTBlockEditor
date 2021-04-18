import $ from "jquery";

type BlockPref = {
  typeId: string;
  index: number;
  panel?: boolean;
  shortcut?: boolean;
};

export function JSONStringify(data: any): string {
  const prototype = (Array.prototype as any) as {
    toJSON: ((obj: any) => string) | null;
  };

  const customToJSON = prototype.toJSON;
  if (customToJSON) {
    Reflect.deleteProperty(prototype, "toJSON");
  }
  const value = JSON.stringify(data);
  if (customToJSON) {
    prototype.toJSON = customToJSON;
  }

  return value;
}

export function serializeBlockPreferences(): void {
  const data = {};
  $("#block_display_options-list").each((index, elem) => {
    const $ul = $(elem);
    const d: BlockPref[] = [];
    $ul.find("> div").each((i, el) => {
      const $li = $(el);
      const t: BlockPref = {
        typeId: $li.data("type-id"),
        index: i,
      };
      if ($li.find(`[name="panel"]`).length) {
        t.panel = $li.find(`[name="panel"]`).prop("checked");
      }
      if ($li.find(`[name="shortcut"]`).length) {
        t.shortcut = $li.find(`[name="shortcut"]`).prop("checked");
      }

      d.push(t);
    });
    data[$ul.data("type")] = d;
  });

  const value = JSONStringify(data);
  $("#block_display_options").val(value);
}

export function unserializeBlockPreferences(): void {
  const options = JSON.parse(
    (document.getElementById("block_display_options") as HTMLInputElement).value
  );
  $.each(options, function (type, data) {
    let $prevLi;
    $.each(data, function (i, block) {
      const $curLi = $(
        `div[data-type="${String(type)}"] div[data-type-id="${block.typeId}"]`
      );

      if ($prevLi) {
        $curLi.insertAfter($prevLi);
      }
      $prevLi = $curLi;

      $curLi.find(`[name="panel"]`).prop("checked", !!block.panel);
      $curLi.find(`[name="shortcut"]`).prop("checked", !!block.shortcut);
    });
  });
}

export async function waitFor(func: () => boolean): Promise<void> {
  return new Promise<void>((resolve) => {
    const timerId = setInterval(() => {
      if (func()) {
        clearInterval(timerId);
        resolve();
      }
    }, 100);
  });
}
