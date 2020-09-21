import React from "react";
import { Badge } from "react-bootstrap";

export function recurrentATM(_cell: any, row: any) {
    if (row.atm_details.recurrent) {
      return (
        <Badge variant={"danger"}>{row.atm}</Badge>
      );
    }
  
    return row.atm;
}