import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import getToken from './GetToken'
import { prisma } from '../lib/prisma'

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req)
  const id = Number(req.params.id)

  if (!token) return res.status(401).send({ error: 'Invalid Token' })

  try {
    const verified = jwt.verify(token, 'mangaManager')

    const user = prisma.user.findUnique({
      where: {
        //eslint-disable-next-line
        //@ts-ignore
        UserID: verified.id,
      },
    })

    if (!user) return res.status(401).send({ error: 'Invalid Token' })

    //eslint-disable-next-line
    //@ts-ignore
    if (id !== verified.UserID)
      return res.status(403).send({ error: 'Access Denied' })

    next()
  } catch (error) {
    return res.status(500).send({ error })
  }
}

export default checkToken
