import moment from 'moment';

export const isEventInProgress = (from: string, to: string) => {
  let fromDate = moment(from, 'DD-MM-YYYY HH:mm');
  let toDate = moment(to, 'DD-MM-YYYY HH:mm');
  let now = moment();

  return fromDate < now && toDate > now;
};

export const hasEventHappened = (to: string) => {
  let toDate = moment(to, 'DD-MM-YYYY HH:mm');
  let now = moment();

  return toDate < now;
};
