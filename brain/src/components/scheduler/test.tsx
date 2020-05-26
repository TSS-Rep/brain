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
        console.log("me habl")
        DirectionsService.route(
          {
            origin: this.props.origin,
            destination: this.props.destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
            drivingOptions: {
              departureTime: new Date(),
              trafficModel: google.maps.TrafficModel.OPTIMISTIC,
            }
          },
          (result, status) => {
            // console.log("status", status);
            if (status === window.google.maps.DirectionsStatus.OK) {
              console.log(result);
              let leg = result.routes[0].legs[0]
              const directionsRenderer = new google.maps.DirectionsRenderer({
                polylineOptions: {
                  strokeColor: this.get_route_color(
                    leg.distance.value,
                    leg.duration_in_traffic.value
                  ),
                  geodesic: true,
                  strokeWeight: 5,
                },
                
              });

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

    /* Base on traffic speed determine the route color
    * 80 km/h -> green
    * 40 - 79 km/h -> orange
    * 0 - 25 km/h -> red
    * Distance is in meters and duration in seconds
    */
    get_route_color(distance: number, duration: number) {
      // convert between meters and seconds to km and hours
      let hours = duration / 3600;
      let km = distance / 1000;
      let traffic_speed = km / hours;
      let color = (traffic_speed >= 80) ? "#24f70c" : (traffic_speed >= 25 && traffic_speed < 80)? "#f7b50c": "#eb4034";
      return color
    }
}
