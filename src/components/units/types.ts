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

export type CityTypes = {
  governorate_name: string;
  governorate_id: number;
};

export type SelectOptionsTypes = { label: string; value: number };

export type DistrictTypes = {
  city_name: string;
  city_id: number;
};

export type UnitTypeTypes = {
  type_name: string;
  id: number;
};

export type SearchFormProps = {
  renderProperties: (
    searchParams: URLSearchParams,
    locale: string,
  ) => React.ReactNode;
};
