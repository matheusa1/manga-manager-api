import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

export const GetMangas = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    const response = await prisma.manga.findMany({
      where: {
        userRelation: id,
      },
    })

    return res.status(200).send({ response })
  } catch (error) {
    return res.status(500).send({ error })
  }
}
