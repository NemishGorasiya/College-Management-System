export const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
  }
}