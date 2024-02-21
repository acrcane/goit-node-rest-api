const HttpError = require("../helpers/HttpError")

const validateBody = (schema) =>  async (req, res, next) => {
    try {
      if (!Object.keys(req.body).length) {
          throw new HttpError(400, 'Body must have at least one field')
      }

      await schema.validateAsync(req.body)
      next()
    } catch (error) {
      const httpError = new HttpError(400, error.message)
      next(httpError)
    }
}


module.exports = validateBody
