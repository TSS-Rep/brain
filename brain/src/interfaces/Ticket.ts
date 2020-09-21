import ATM from "interfaces/ATM";

export default interface Ticket {
  _id: string;
  atm: ATM;
  start_date: string;
  engineer?: number;
  atm_mvs: String,
  bu_code: string,
  call_comments: string,
  client_id: number,
  creator_id: string,
  engineer_id: string,
  engineer_name: string,
  esn: string,
  last_status_update_date: string,
  service: string,
  severity: number,
  status: string,
}
