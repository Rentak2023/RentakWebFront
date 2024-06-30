import { type CityTypes, type DistrictTypes } from "@/components/units/types";
import ky from "@/lib/ky";

type CitiesResponse = {
  message: string;
  data: Array<CityTypes>;
};

export async function getCities() {
  const res = await ky
    .get("location/get-all-governorates")
    .json<CitiesResponse>();

  return res.data;
}

type DistrictsResponse = {
  message: string;
  data: Array<DistrictTypes>;
};

export async function getDistricts(governorate_id: number | string) {
  const res = await ky
    .get("location/get-all-cities", {
      searchParams: {
        governorate_id: governorate_id,
      },
    })
    .json<DistrictsResponse>();

  return res.data;
}
