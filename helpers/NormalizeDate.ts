export const GenerateDateString: () => string = () => {
  const today: Date = new Date();
  const date: string =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1 <= 9
      ? "0" + Number(today.getMonth() + 1)
      : today.getMonth() + 1) +
    "-" +
    (today.getDate() <= 9 ? "0" + Number(today.getDate()) : today.getDate());
  return date;
};
