import moment from "moment";

const formatDateYYYYMD = function (date: string): string {
  return moment(new Date(date)).format("YYYY M. D.");
};

export { formatDateYYYYMD };
