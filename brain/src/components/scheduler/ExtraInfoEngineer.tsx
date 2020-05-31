import React from 'react'
import Card from 'react-bootstrap/Card';
import Engineer from 'interfaces/Engineer';


interface ExtraInfoEngineer {
  engineer: Engineer;
}

export const ExtraInfoEngineer: React.SFC<ExtraInfoEngineer> = (props) => {
    return (
      <div className="p-1">
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>{props.engineer.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <b>ID: </b>
              {props.engineer._id}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Región: </b>
              {toPascalCase(props.engineer.region)}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Sub Región: </b>
              {toPascalCase(props.engineer.sub_region)}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Estado: </b>
              {toPascalCase(props.engineer.state)}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Ciudad: </b>
              {toPascalCase(props.engineer.city)}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Plataforma: </b>
              {toPascalCase(props.engineer.platform)}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Manager de Campo: </b>
              {toPascalCase(props.engineer.manager)}
            </Card.Subtitle>
            <Card.Link href="#">Ver estadísticas</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
}
function toPascalCase(str: string) {
    return str.replace(/\w+/g, (w: string) => {return w[0].toUpperCase() + w.slice(1).toLowerCase();})
}
