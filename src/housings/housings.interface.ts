export interface BaseHousing {
  name: string;
  city: string;
  address: string;
  price: string;
  rent: boolean;
}

export interface Housing extends BaseHousing {
  id: string;
}
