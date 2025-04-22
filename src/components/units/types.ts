export type FormValues = {
  keyword?: string;
  governoment_id?: number | string;
  city_id?: number | string;
  price_from?: number | null;
  price_to?: number | null;
  finish_type?: string | null;
  property_type?: Array<string>;
  bathroom_numbers?: string;
  room_numers?: string;
};
