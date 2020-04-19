import React, { Component } from "react";
import Card from "react-bootstrap/Card";

interface MapCardProps {
  lat: number;
  lng: number;
  service: string | null;
}

class MapCard extends Component<MapCardProps> {
  handleClick(e: any) {
    e.preventDefault();
    console.log("The link was clicked.");
  }
  render() {
    return (
      <span onClick={this.handleClick}>
        <Card style={{ width: "20px", height: "20px" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
        </Card>
      </span>
    );
  }
}

export default MapCard;
