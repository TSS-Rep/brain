import React from 'react'
import Card from 'react-bootstrap/Card';
import ATM from 'interfaces/ATM';


interface ExtraInfoATMProps {
    atm: ATM
}

export const ExtraInfoATM: React.SFC<ExtraInfoATMProps> = (props) => {
    return (
      <div className="p-1">
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>{props.atm._id}</Card.Title>

            <Card.Subtitle className="mb-2 text-muted">
              <b>Brand: </b>
              {props.atm.brand}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Servicio: </b>
              {props.atm.service === "SUC" ? "SUCURSAL" : "REMOTO"}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Región: </b>
              {props.atm.region}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Service Time: </b>
              {props.atm.service_time}
            </Card.Subtitle>

            <Card.Subtitle className="mb-2 text-muted">
              <b>Dirección: </b>
              {getCompleteAddress(props.atm)}
            </Card.Subtitle>
            <Card.Link href="#">Ver estadísticas</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
}
function getCompleteAddress(atm: any) {
    let address = atm.address ? atm.address.replace(/\w+/g,
        function(w: string){return w[0].toUpperCase() + w.slice(1).toLowerCase();}) : "";
    let suburb = atm.suburb ? atm.suburb.replace(/\w+/g,
        function(w: string){return w[0].toUpperCase() + w.slice(1).toLowerCase();}) : "";
    let postal_code = atm.postal_code ? atm.postal_code : "";
    let city = atm.city ? atm.city.replace(/\w+/g,
        function(w: string){return w[0].toUpperCase() + w.slice(1).toLowerCase();}) : "";
    let state = atm.state ? atm.state.replace(/\w+/g,
        function(w: string){return w[0].toUpperCase() + w.slice(1).toLowerCase();}) : "";

    return `${address}, ${suburb}, ${postal_code}, ${city}, ${state}`
}
