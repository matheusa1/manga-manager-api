import { Request } from 'express'

const getToken = (req: Request) => {
  const authHeader = req.headers.authorization
  if (authHeader !== undefined) {
    const token = authHeader.split(' ')[1]
    return token
  }
  return null
}

export default getToken
