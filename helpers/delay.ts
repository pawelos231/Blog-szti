export const delay = (ms: number) =>
  new Promise((res, rej) => setTimeout(res, ms));
