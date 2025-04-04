import {StatusCodes} from "http-status-codes"
import { CustomAPIError } from "../errors/index.js"
const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }


  return res.status(customError.statusCode).json({ msg: customError?.msg })
}

export default errorHandlerMiddleware
