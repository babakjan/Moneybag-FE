import moment from "moment";

function formatDate(date: string): string {
  return moment(new Date(date)).format("D. M. YYYY");
}

function formatDateAndTime(date: string): string {
  return moment(new Date(date)).format("D. M. YYYY H:mm");
}

export { formatDate, formatDateAndTime };
