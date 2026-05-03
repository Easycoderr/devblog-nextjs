import { formatDistance, isValid, subDays } from "date-fns";
function dateCalculation(date) {
  const newDate = new Date(date);
  const isValidDate = date && !isNaN(newDate.getTime());
  if (isValidDate) {
    return formatDistance(newDate, new Date(), {
      addSuffix: true,
    });
  } else {
    return "Date Unkown";
  }
}

export default dateCalculation;
