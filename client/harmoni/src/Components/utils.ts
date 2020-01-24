import moment from "moment";

// Check if event is currently in progress
export const isEventInProgress = (from: string, to: string) => {
  let fromDate = moment(from, "DD-MM-YYYY HH:mm");
  let toDate = moment(to, "DD-MM-YYYY HH:mm");
  let now = moment();

  return fromDate < now && toDate > now;
};

// Check if event is over
export const hasEventHappened = (to: string) => {
  let toDate = moment(to, "DD-MM-YYYY HH:mm");
  let now = moment();

  return toDate < now;
};

// Compare dates to check which date is first/last
export const compareDates = (date1, date2) => {
  let fromDate = new Date(date1);
  let toDate = new Date(date2);

  return fromDate < toDate;
};
