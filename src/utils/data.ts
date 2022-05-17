export function formatDataStrapi(data: any) {
  if (!data) {
    return;
  }

  const keys = Object.keys(data) || [];

  const seperateData: any[] = keys.map((key) => {
    if ((key === "attributes" || key === "data") && !Array.isArray(data[key])) {
      return formatDataStrapi(data[key]);
    }

    if (Array.isArray(data[key])) {
      return {
        [key]: Object.values(formatDataStrapi(data[key])),
      };
    }

    if (typeof data[key] === "object" && !Array.isArray(data[key])) {
      return {
        [key]: formatDataStrapi(data[key]),
      };
    }

    return {
      [key]: data[key],
    };
  });

  return seperateData.reduce((acc, nextValue) => {
    return {
      ...acc,
      ...nextValue,
    };
  }, {});
}
