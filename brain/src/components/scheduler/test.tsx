import React, { Component } from 'react'

interface tprops {
    map: google.maps.Map | null;
    origin: google.maps.LatLngLiteral;
    destination: google.maps.LatLngLiteral;
}

export default class Test extends Component<tprops> {
    
    constructor(props)
    {
        super(props)

        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route(
          {
            origin: new google.maps.LatLng(19.5682414, -99.0436029),
            destination: new google.maps.LatLng(19.7682414, -99.0436029),
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            // console.log("status", status);
            if (status === window.google.maps.DirectionsStatus.OK) {
                console.log(result)
              const directionsRenderer = new google.maps.DirectionsRenderer();
              console.log("props.map", this.props.map);
              directionsRenderer.setMap(this.props.map);
              directionsRenderer.setDirections(result);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
    }

    
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
