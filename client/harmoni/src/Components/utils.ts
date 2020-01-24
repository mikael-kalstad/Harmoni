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

export const passwordValidation = (password: string) => {
  let count = 0;

  // Add to count if test match
  count += /[a-z]/.test(password) ? 1 : 0;
  count += /[A-Z]/.test(password) ? 1 : 0;
  count += /[@]/.test(password) ? 1 : 0;
  count += /[0-9]/.test(password) ? 1 : 0;

  // Password is only valid if more than two test match and
  // length is greater than 5
  if (count >= 2 && password.length > 5) {
    return true;
  } else if (count < 2) return false;
};
