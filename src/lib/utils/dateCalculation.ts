import { format, formatDistance } from "date-fns";
function dateCalculation(date: Date, type?: string): string {
  const newDate = new Date(date);
  const isValidDate = !isNaN(newDate.getTime());
  if (isValidDate && type === "full") {
    return format(newDate, "MMMM yyyy");
  }
  if (isValidDate) {
    return formatDistance(newDate, new Date(), {
      addSuffix: true,
    });
  } else {
    return "Date Unkown";
  }
}

export default dateCalculation;
