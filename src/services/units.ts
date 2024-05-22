import ky from "@/lib/ky";

type Owner = {
  id: number;
  name: string;
  email: string;
  picture: string;
};
type PropertyType = {
  id: number;
  type_name?: string;
};
type FinishType = {
  id: number;
  type_name?: string;
};

type GallaryItem = {
  id: number;
  url: string;
  type?: number;
};

type Location = {
  id: number;
  address_in_detail: string;
  city_id: number;
  city_name: string;
  governorate_id: number;
  governorate_name: string;
  latitude?: number;
  longitude?: number;
};
type Attribute = {
  id: number;
  attribute_id: number;
  attribute_name: string;
};
type Room = {
  id: number;
  room_name: string;
  num_of_rooms: number;
};

export type Unit = {
  id: number;
  property_name: string;
  property_description: string;
  price: number;
  picture: string;
  room_numbers: number;
  bathroom_numbers: number;
  area: number;
  created_at: string;
  ago: string;
  owner: Owner;
  property_type: PropertyType;
  finish_type: FinishType;
  gallary: Array<GallaryItem>;
  location: Location;
  attributes: Array<Attribute>;
  rooms: Array<Room>;
};

type UnitsResponse = {
  message: string;
  data: Array<Unit>;
};

export async function getUnits({ locale }: { locale: string }) {
  const res = await ky
    .get("home/get-home-units", {
      searchParams: {
        lang: locale,
      },
    })
    .json<UnitsResponse>();

  return res.data;
}
