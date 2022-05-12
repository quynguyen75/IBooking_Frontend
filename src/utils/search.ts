export function convertSearchToObject(search: string) {
  return Object.fromEntries(new URLSearchParams(search));
}

export function objectToURLParams(object: any) {
  return new URLSearchParams(object).toString();
}

export function objectToURLParamsStrapi(object: any): string {
  let params = "";

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];

      params += `${params ? "&" : ""}filters[${key}][${element.operator}]=${
        element.value
      }`;
    }
  }

  return params;
}
