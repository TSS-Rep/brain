export default interface Engineer {
  name: string;
  _id: number;
  coor: { lat: number; lng: number };
  region: string;
  sub_region: string;
  state: string;
  city: string;
  platform: string;
  manager: string;
}