import { useEffect } from "react";

export function DirectionsRendererTest(props: {
  map: google.maps.Map | null;
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
}) {
  async function getRoute(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral
  ): Promise<google.maps.DirectionsResult> {
    const directionsService = new google.maps.DirectionsService();
    return new Promise(function (resolve, reject) {
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result: any, status: google.maps.DirectionsStatus) => {
          if (status === google.maps.DirectionsStatus.OK) {
            console.log(result)
            resolve(result);
          } else {
            console.log("no")
            reject(result);
          }
        }
      );
    });
  }

  async function renderRoute() {
    const directions = await getRoute(props.origin, props.destination);
    const directionsRenderer = new google.maps.DirectionsRenderer();
    console.log('props.map', props.map)
    directionsRenderer.setMap(props.map);
    directionsRenderer.setDirections(directions);
  }

  useEffect(() => {
    renderRoute().catch((err) => {
      console.log(err);
    });
  }, [props]);

  return null;
}
