const HttpError = require("../helpers/HttpError")

const validateBody = (schema) =>  async (req, res, next) => {
    try {
      // console.log('Params ID:', req.params.id);
      // console.log('Body keys length:', Object.keys(req.body).length);
      // if (!req.params.id && !Object.keys(req.body).length) {
      //   console.log("11111");
      //   throw new HttpError(400, 'Body must have at least one field')
      // }

      if (!Object.keys(req.body).length) {
        console.log("22222");
          throw new HttpError(400, 'Body must have at least one field')
      }

      await schema.validateAsync(req.body)
      next()
    } catch (error) {
      console.log("33333");
      const httpError = new HttpError(400, error.message)
      next(httpError)
    }
}


module.exports = validateBody
