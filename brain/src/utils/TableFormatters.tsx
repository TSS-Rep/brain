import ActionHandler, { SetOfActions } from "components/scheduler/actions/ActionHandler";
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

export function callActionsHandler(_cell: any, _row: any, _rowIndex: number, formatExtraData: SetOfActions) {
  return <ActionHandler setOfActions={formatExtraData}/>
}