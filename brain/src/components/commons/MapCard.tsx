import React, { Component } from "react";
import Figure from "react-bootstrap/Figure";

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
        <Figure>
          {this.props.service ? (
            <Figure.Image
              width={30}
              height={30}
              alt="171x180"
              src={process.env.PUBLIC_URL + "/img/STD_LOGO.png"}
            />
          ) : (
            <Figure.Image
              width={30}
              height={30}
              alt="171x180"
              src={process.env.PUBLIC_URL + "/img/ENG_LOGO.png"}
            />
          )}
        </Figure>
      </span>
    );
  }
}

export default MapCard;
