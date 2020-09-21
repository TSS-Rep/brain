import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import BrainMap from "components/scheduler/BrainMap";
import TicketSchedulerTable2 from "components/scheduler/TicketSchedulerTable2";
import TicketSchedulerTable from "components/scheduler/SchedulerTicketTable";
import Ticket from "interfaces/Ticket";
import "components/scheduler/Scheduler.css";

interface SchedulerState {
  tickets: Ticket[] | [];
  ticketsShowedOnMap: {
    [key: string]: boolean;
  };
  map : google.maps.Map | null;
}
type showOnMap = {
  [key: string]: boolean;
};

class Scheduler extends Component {
  private tickets: Ticket[];
  private engineers: any[];
  private ticketsShowedOnMap: showOnMap = {};
  state: SchedulerState;
  constructor(props: any) {
    super(props);
    this.tickets = []
    // this.tickets = [
    //   {
    //     _id: "P267349",
    //     atm: {
    //       _id: "X99314",
    //       address: "AV. VIA MORELOS NO. 242",
    //       suburb: "SANTA MARIA TULPETLAC",
    //       postal_code: 55400,
    //       city: "ECATEPEC DE MORELOS",
    //       state: "ESTADO DE MEXICO",
    //       service: "SUC",
    //       brand: "DIEBOLD",
    //       model: "NEXTGEN 3700",
    //       region: "METRO NORTE",
    //       service_time: "L-V 09:00-16:00",
    //       recurrent: false,
    //       coor: {
    //         lat: 19.5682414,
    //         lng: -99.0436029,
    //       },
    //     },
    //     start_date: "25/04/2020 11:42",
    //     engineer: 1730276,
    //   },

    //   {
    //     _id: "P265372",
    //     atm: {
    //       _id: "X99314",
    //       address: "AV. VIA MORELOS NO. 242",
    //       suburb: "SANTA MARIA TULPETLAC",
    //       postal_code: 55400,
    //       city: "ECATEPEC DE MORELOS",
    //       state: "ESTADO DE MEXICO",
    //       service: "SUC",
    //       brand: "DIEBOLD",
    //       model: "NEXTGEN 3700",
    //       region: "METRO NORTE",
    //       service_time: "L-V 09:00-16:00",
    //       recurrent: true,
    //       coor: {
    //         lat: 19.5092414,
    //         lng: -99.0836029,
    //       },
    //     },
    //     start_date: "25/04/2020 11:42",
    //     engineer: 1376310,
    //   },
    // ];
    this.engineers = [
      {
        name: "CALVILLO FLORIANO JOSE DE JESUS",
        _id: 1730276,
        coor: {
          lat: 19.5292414,
          lng: -99.0611029,
        },
        region: "NORTE",
        sub_region: "NOROESTE",
        state: "AGUASCALIENTES",
        city: "AGUASCALIENTES",
        platform: "Self Service",
        manager: "Cynthia Plata",
      },

      {
        name: "Alberto Barros",
        _id: 1376310,
        coor: {
          lat: 19.4326071,
          lng: -99.13921299999999,
        },
        region: "NORTE",
        sub_region: "NOROESTE",
        state: "AGUASCALIENTES",
        city: "AGUASCALIENTES",
        platform: "Self Service",
        manager: "Cynthia Plata",
      },
    ];

    for (let i = 0; i < this.tickets.length; i++) {
      let ticket = this.tickets[i];
      this.ticketsShowedOnMap[ticket._id] = true;
    }

    this.state = {
      tickets: this.tickets,
      // Show all the tickets by default
      ticketsShowedOnMap: this.ticketsShowedOnMap,
      map: null
    };
  }

  handleTicketsShowedOnMapState(ticketsShowedOnMap: showOnMap) {
    console.log(ticketsShowedOnMap);
    this.setState({ ticketsShowedOnMap });
  }

  setMap(map: google.maps.Map){
    this.setState({map});
  }

  render() {
    return (
      <div id="scheduler">
        <Row>
          <Col className="ml-4">
            <Card className=" mt-2">
              <Card.Header>Tickets Asignados</Card.Header>
              <Card.Body>
                <TicketSchedulerTable
                  tickets={this.tickets}
                  engineers={this.engineers}
                  actions={["change", "cancel", "displayOnMap"]}
                  ticketsShowedOnMap={this.state.ticketsShowedOnMap}
                  handleTicketsShowedOnMapState={this.handleTicketsShowedOnMapState.bind(
                    this
                  )}
                  map={this.state.map}
                />
              </Card.Body>
            </Card>

            <Card className=" mt-2">
              <Card.Header>Tickets No Asignados</Card.Header>
              <Card.Body>
                <TicketSchedulerTable
                  tickets={this.tickets}
                  engineers={this.engineers}
                  actions={["assign", "change", "cancel", "displayOnMap"]}
                  ticketsShowedOnMap={this.state.ticketsShowedOnMap}
                  handleTicketsShowedOnMapState={this.handleTicketsShowedOnMapState.bind(
                    this
                  )}
                  map={this.state.map}
                />
              </Card.Body>
            </Card>

            <Card className=" mt-2">
              <Card.Header>Tickets No Asignados</Card.Header>
              <Card.Body>
                <TicketSchedulerTable2/>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <BrainMap
              tickets={this.state.tickets.filter((ticket) => {
                return this.state.ticketsShowedOnMap[ticket._id];
              })}
              engineers={this.engineers}
              setMap={this.setMap.bind(this)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Scheduler;
