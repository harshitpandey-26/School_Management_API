
// Middleware for validating request body
const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.errors
    });
  }
  next();
};


// Middleware for validating request body
const validateQuery = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.errors
    });
  }
  next();
};


module.exports = { validateBody,validateQuery };