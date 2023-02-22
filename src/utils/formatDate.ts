import moment from "moment";

//format date to D. M. YYYY format
function formatDate(date: string): string {
  return moment(new Date(date)).format("D. M. YYYY");
}

//format date and time to D. M. YYYY H:mm format
function formatDateAndTime(date: string): string {
  return moment(new Date(date)).format("D. M. YYYY H:mm");
}

//format date to ISO8601 format YYYY-MM-DD
function formatYYYYMMDD(date: Date): string {
  return moment(date).format("YYYY-MM-DD");
}

export { formatDate, formatDateAndTime, formatYYYYMMDD };
