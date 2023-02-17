import moment from "moment";

const formatDateYYYYMD = function (date: string): string {
  return moment(new Date(date)).format("D. M. YYYY");
};

export { formatDateYYYYMD };
