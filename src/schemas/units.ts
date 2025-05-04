import * as v from "valibot";

export const UnitSchema = v.object({
  id: v.number(),
  property_name: v.string(),
  english_name: v.string(),
  property_description: v.nullable(v.string()),
  meta_description: v.nullable(v.string()),
  price: v.number(),
  picture: v.string(),
  room_numbers: v.number(),
  bathrom_numbers: v.number(),
  area: v.nullable(v.number()),
  created_at: v.string(),
  ago: v.string(),
  is_inspection: v.boolean(),
  // owner: v.nullable(
  //   v.object({
  //     id: v.number(),
  //     name: v.string(),
  //     email: v.nullable(v.string()),
  //     phone: v.string(),
  //   }),
  // ),
  property_type: v.object({
    id: v.number(),
    type_name: v.nullable(v.string()),
  }),
  finish_type: v.object({
    id: v.number(),
    type_name: v.nullable(v.string()),
  }),
  gallary: v.array(
    v.object({
      id: v.number(),
      url: v.string(),
      type: v.nullable(v.number()),
    }),
  ),
  location: v.object({
    id: v.number(),
    address_in_detail: v.nullable(v.string()),
    city_id: v.nullable(v.number()),
    city_name: v.nullable(v.string()),
    governorate_id: v.nullable(v.number()),
    governorate_name: v.nullable(v.string()),
    // latitude: v.nullable(v.number()),
    // longitude: v.nullable(v.number()),
  }),
  // attributes: v.array(
  //   v.object({
  //     id: v.number(),
  //     attribute_id: v.number(),
  //     attribute_name: v.string(),
  //   }),
  // ),
  rooms: v.array(
    v.object({
      id: v.number(),
      room_name: v.string(),
      num_of_rooms: v.number(),
    }),
  ),
});

export type UnitSchema = v.InferOutput<typeof UnitSchema>;

export const UnitsListResponseSchema = v.object({
  items: v.array(UnitSchema),
  page: v.number(),
  total_count: v.number(),
});

export const UnitInspectionSchema = v.object({
  total_score: v.string(),
  rooms: v.array(
    v.object({
      room_type: v.string(),
      room_score: v.string(),
      inspections: v.record(v.string(), v.object({ status: v.string() })),
    }),
  ),
});
