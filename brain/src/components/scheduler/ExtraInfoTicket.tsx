import React from 'react'
import Card from 'react-bootstrap/Card';
import Ticket from 'interfaces/Ticket';
import { formattedDate } from 'utils/CleanUtils';


interface ExtraInfoTicketProps {
    ticket: Ticket
}

export const ExtraInfoTicket: React.SFC<ExtraInfoTicketProps> = (props) => {
    return (
      <div className="p-1">
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>{props.ticket._id}</Card.Title>

            <Card.Subtitle className="mb-2 text-muted">
              <b>ESN: </b>
              {props.ticket.esn}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Severidad: </b>
              {props.ticket.severity}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Estatus: </b>
              {props.ticket.status}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Fecha de última actualización: </b>
              {formattedDate(props.ticket.last_status_update_date)}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>ID del Ingeniero: </b>
              {props.ticket.engineer_id}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Nombre del Ingeniero: </b>
              {props.ticket.engineer_name}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>BU Code: </b>
              {props.ticket.bu_code}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Comentarios: </b>
              {props.ticket.call_comments}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>ID del creador: </b>
              {props.ticket.creator_id}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Servicio: </b>
              {props.ticket.service}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              <b>ATM MVS: </b>
              {props.ticket.atm_mvs}
            </Card.Subtitle>
            <Card.Link href="#">Ver registo</Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
}
