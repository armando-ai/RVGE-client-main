export const isBlank = (...values: string[]) => {
  return values.every((value) =>
    value === "" || value === undefined || value === null ? false : true
  );
};
