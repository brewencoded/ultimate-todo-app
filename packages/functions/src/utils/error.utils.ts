const BAD_REQUEST_DEFAULT = "Bad Request"

export const BadRequest = (message = BAD_REQUEST_DEFAULT) => ({
  error: true,
  message: message
})