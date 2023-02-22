import { ApiParameter } from "@/api/api";
import { formatYYYYMMDD } from "@/utils/formatDate";

/**
 * compute inclusive date interval parameters for api from date interval
 * @param dateInterval array of length 2 in ISO8601 format e.g. ["2023-01-31", "2023-02-28"]
 * @return api parameters as an inclusive range, api takes 2 parameters - dataGe (date greater or equal than),
 * dataLt (date lower than), return interval, where end date is shifted by one day in order to be inclusive
 */
function getDateIntervalApiParameters(dateInterval: string[]): ApiParameter[] {
  if (dateInterval.length != 2) {
    return [];
  }

  const endInclusiveDate = new Date(dateInterval[1]);
  endInclusiveDate.setDate(endInclusiveDate.getDate() + 1);

  return [
    { name: "dateGe", value: dateInterval[0] },
    { name: "dateLt", value: formatYYYYMMDD(endInclusiveDate) },
  ];
}

export default getDateIntervalApiParameters;
