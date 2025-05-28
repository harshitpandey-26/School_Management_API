// School listing validation for Latitude and Longitude

const z = require("zod");

const listSchoolSchema = z.object({

  latitude: z.coerce.number()
  .min(-90)
  .max(90)
  .refine(val => Number.isFinite(val), { message: "Latitude must be a valid number between -90 to 90." }),
  
  longitude: z.coerce.number()
  .min(-180)
  .max(180)
  .refine(val => Number.isFinite(val), { message: "Longitude must be a valid number between -180 to 180." }),

});

module.exports = {listSchoolSchema};