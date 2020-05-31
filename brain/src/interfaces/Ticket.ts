import ATM from "interfaces/ATM";

export default interface Ticket {
  _id: string;
  atm: ATM;
  start_date: string;
  engineer?: number;
}
