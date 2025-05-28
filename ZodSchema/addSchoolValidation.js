// Adding School validation for Name, Address, Latitude and Longitude

const z = require("zod");

const addSchoolSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.number().min(-90).max(90).refine(val => Number.isFinite(val), { message: "Latitude must be a valid number between -90 to 90." }),
  longitude: z.number().min(-180).max(180).refine(val => Number.isFinite(val), { message: "Longitude must be a valid number between -180 to 180." }),
});

module.exports = { addSchoolSchema };