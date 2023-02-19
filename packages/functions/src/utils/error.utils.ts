const BAD_REQUEST_DEFAULT = "Bad Request"

export BadRequest = (message = BAD_REQUEST_DEFAULT) => ({
  error: true,
  message: message
})