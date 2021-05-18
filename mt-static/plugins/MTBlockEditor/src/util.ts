import JSON from "./util/JSON";

type BlockPref = {
  typeId: string;
  index: number;
  panel?: boolean;
  shortcut?: boolean;
};

export function serializeBlockPreferences(): void {
  const data = {};
  (document.querySelectorAll(
    "#block_display_options-list"
  ) as NodeListOf<HTMLInputElement>).forEach((list) => {
    const d: BlockPref[] = [];
    (list.querySelectorAll(":scope > div") as NodeListOf<HTMLElement>).forEach(
      (item, i) => {
        const t: BlockPref = {
          typeId: String(item.dataset.typeId),
          index: i,
        };

        const panel = item.querySelector(
          `[name="panel"]`
        ) as HTMLInputElement | null;
        const shortcut = item.querySelector(
          `[name="shortcut"]`
        ) as HTMLInputElement | null;
        if (panel) {
          t.panel = panel.checked;
        }
        if (shortcut) {
          t.shortcut = shortcut.checked;
        }

        d.push(t);
      }
    );
    data[String(list.dataset.type)] = d;
  });

  const blockDisplayOptions = document.querySelector(
    "#block_display_options"
  ) as HTMLInputElement;
  blockDisplayOptions.value = JSON.stringify(data);
}

export function unserializeBlockPreferences(): void {
  const options = JSON.parse(
    (document.getElementById("block_display_options") as HTMLInputElement).value
  ) as Record<string, Array<Record<string, unknown>>>;
  Object.entries(options).forEach(([type, data]) => {
    const list = document.querySelector(
      `div[data-type="${type}"]`
    ) as HTMLElement;

    let insertMarker: ChildNode | null = null;
    data.forEach((block) => {
      const curItem = list.querySelector(
        `div[data-type-id="${block.typeId}"]`
      ) as HTMLElement;

      list.insertBefore(curItem, insertMarker);
      insertMarker = curItem.nextSibling;

      (curItem.querySelector(
        `[name="panel"]`
      ) as HTMLInputElement).checked = !!block.panel;
      (curItem.querySelector(
        `[name="shortcut"]`
      ) as HTMLInputElement).checked = !!block.shortcut;
    });
  });
}

export async function waitFor(
  func: () =>
    | boolean
    | null
    | undefined
    | Element
    | Promise<boolean | null | undefined | Element>
): Promise<boolean | null | Element> {
  return new Promise((resolve) => {
    function check(): void {
      const res = func();
      if (res) {
        Promise.resolve(res).then(resolve);
      } else {
        setTimeout(check, 100);
      }
    }
    // check in async
    setTimeout(check);
  });
}

export function showAlert({
  msg,
  alertClass,
}: {
  msg: string;
  alertClass?: string;
}): void {
  alertClass ||= "danger";

  const elm = document.querySelector("#msg-block") as HTMLElement;
  elm.textContent = "";

  const error = document.createElement("div");
  error.classList.add("alert", "alert-dismissable", `alert-${alertClass}`);
  error.innerHTML = `<button class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`;
  error.insertAdjacentText("beforeend", msg);

  elm.appendChild(error);
}
