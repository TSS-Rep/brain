export default interface ATM {
    _id: string;
    address: string;
    suburb: string;
    postal_code: number;
    city: string;
    state: string;
    brand: string;
    model: string;
    service: string;
    region: string;
    service_time: string;
    recurrent: boolean;
    coor: {
      lat: number;
      lng: number;
    };
  }