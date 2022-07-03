import type { TError } from "../errorEntity"

export default responseErrorInterceptor

function responseErrorInterceptor(error: TError) {
  const status: number = error.response?.status || 0
  let msg = ''
  switch(status) {
    case 400:
      msg = 'Oops, Bad Request!, ' + error.response?.data.error
      break
    case 401:
      msg = 'Oops, You are Unauthorizated!'
      break
    case 500:
      msg = 'Sorry! Server Error!, please try again later'
      break
    default:
      msg = error.message
  }

  error.statusNum = status
  error.message = msg
  throw error
}