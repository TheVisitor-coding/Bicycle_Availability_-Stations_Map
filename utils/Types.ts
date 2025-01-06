export interface Station {
  position: {
    lat: number;
    lon: number;
  };
  number: number
  name: string;
  address: string;
  status: string;
  bike_stands: number;
  available_bikes: number;
  available_bike_stands: number;
  last_update: string;
}
