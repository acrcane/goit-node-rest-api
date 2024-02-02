const HttpError = require("../helpers/HttpError")

const validateBody = (schema) =>  async (req, res, next) => {
    try {
      if (Object.keys(req.body).length === 0 && !req.params.id) {
        throw new HttpError(400, 'Body must have at least one field')
      } else if (Object.keys(req.body).length) {
        throw new HttpError(404, 'Not found')
      }

      await schema.validateAsync(req.body)
      next()
    } catch (error) {
      const httpError = new HttpError(400, error.message);
      next(httpError)
    }
};


module.exports = validateBody
