import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) return res.status(422).send({ error: 'Missing body parameter(s)' })
  try {
    const user = await prisma.user.findUnique({
      where: {
        UserID: id,
      },
    })

    if (!user) return res.status(404).send({ error: 'User not found' })

    const mangas = await prisma.manga.findMany({
      where: {
        userRelation: id,
      },
    })

    await mangas.forEach(async (manga) => {
      await prisma.manga.delete({
        where: {
          MangaID: manga.MangaID,
        },
      })
    })

    const response = await prisma.user.delete({
      where: {
        UserID: id,
      },
    })

    return res.status(200).send({ message: 'User deleted' })
  } catch (error) {
    return res.status(500).send({ error })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { name, password }: { name: string; password: string } = req.body

  if (!id || !name || !password)
    return res.status(422).send({ error: 'Missing body parameter(s)' })

  try {
    const user = await prisma.user.findUnique({
      where: {
        UserID: id,
      },
    })

    if (!user) return res.status(404).send({ error: 'User not found' })

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const response = await prisma.user.update({
      where: {
        UserID: id,
      },
      data: {
        name,
        password: passwordHash,
      },
    })

    const token = jwt.sign(response, 'mangaManager')

    return res.status(200).send({
      user: { id: response.UserID, name: response.name, email: response.email },
      token,
    })
  } catch (error) {
    return res.status(500).send({ error })
  }
}
