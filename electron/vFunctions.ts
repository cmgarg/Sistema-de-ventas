const getDate = (): string => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const date = `${day.toString().padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year.toString()}`;

  return date;
};

export { getDate };
