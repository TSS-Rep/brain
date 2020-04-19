import React, { Component } from "react";

import BrainMap from "./BrainMap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Scheduler extends Component {
  state = { width: 200, height: 200 };

  render() {
    return (
      <div id="scheduler">
        <Row>
          <Col>Hola</Col>
          <Col>
            <BrainMap />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Scheduler;
