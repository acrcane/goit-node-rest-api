const HttpError = require("../helpers/HttpError")

// const validateBody = (schema) =>  async (req, res, next) => {
//     try {
//       if (Object.keys(req.body).length === 0) {
//         throw new HttpError(400, 'Body must have at least one field');
//       }
//       await schema.validateAsync(req.body)
//       next()
//     } catch (error) {
//       const httpError = new HttpError(400, error.message);
//       next(httpError)
//     }
// };

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

// export default validateBody;


module.exports = validateBody
