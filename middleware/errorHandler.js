export const createError = (  message ,status) =>
{
  const error = new Error()
  error.message = message
  error.status = status
return error

}

export const errorHandler = ( err, req, res, next ) =>
{
  const errorStatus = err.status || 500
  const errorMessage = err.message || `Some thing went wrong!. ${err}`
    return res.status( errorStatus ).send( errorMessage )
    
}
