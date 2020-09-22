import Cancel from 'components/scheduler/actions/Cancel';
import Row from "react-bootstrap/Row";
import React from 'react'
import { Col } from 'react-bootstrap';
import DisplayOnMap from 'components/scheduler/actions/DisplayOnMap';
import ChangeEngineer from 'components/scheduler/actions/ChangeEngineer';
import Assign from 'components/scheduler/actions/Assign';


export enum SetOfActions {
    UNASSIGNED_TICKET = 0,
    ASSIGNED_TICKET = 1,
  }

interface ActionHandler {
    setOfActions: SetOfActions,
}

export default function ActionHandler(props: ActionHandler) {
    switch(props.setOfActions) {
        case SetOfActions.UNASSIGNED_TICKET:
          return (
            <Row>
                <Col>
                    <Assign />
                </Col>
                <Col>
                    <ChangeEngineer/>
                </Col>
                <Col>
                    <Cancel />
                </Col>
                <Col>
                    <DisplayOnMap />
                </Col>
            </Row>
          )
        case SetOfActions.ASSIGNED_TICKET:
          return (
            <div>
    Hola2
            </div>
          )
        default:
          return (<div></div>)
      }
}
