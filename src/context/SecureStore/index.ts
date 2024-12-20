import moment from "moment";

export const jwtValid = (loginTime: string): boolean => {
  const now = moment();
  const jwtDate = moment(loginTime, "DD-MM-YYYY HH:mm:ss").add(1, "minutes");
  const difference = jwtDate.diff(now);
  return difference > 0 ? true : false;
};
