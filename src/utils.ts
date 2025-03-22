export const classNames = (i: string | string[]) =>
  typeof i === "string" ? i : i.filter(Boolean).join(" ");
