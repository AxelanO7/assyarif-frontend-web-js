export const listMonth = (month: string) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return months[parseInt(month) - 1];
};

export const getFormatDate = (date: string) => {
  const dateArr = date.split("-");
  return `${listMonth(dateArr[0])} ${dateArr[1]}`;
};
