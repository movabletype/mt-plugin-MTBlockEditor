/* eslint @typescript-eslint/no-explicit-any: 0 */

function JSONStringify(data: any): string {
  const prototype = Array.prototype as any as {
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

const JSONObject = {
  parse: (json: string): any => JSON.parse(json),
  stringify: JSONStringify,
};

export { JSONObject as default };
