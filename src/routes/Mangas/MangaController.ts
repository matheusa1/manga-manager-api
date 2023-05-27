import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

export const CreateManga = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { title, image_url, volumes, myAnimeListID } = req.body

  if (!title || !image_url || !volumes || !myAnimeListID)
    return res.status(400).send({ error: 'Missing body parameter' })

  try {
    const user = await prisma.user.findUnique({
      where: {
        UserID: id,
      },
    })

    if (!user) return res.status(404).send({ error: 'User not found' })

    const manga = await prisma.manga.findMany({
      where: {
        myAnimeListID,
        user: {
          UserID: id,
        },
      },
    })
    console.log({ manga })

    if (manga.length > 0)
      return res.status(400).send({ error: 'Manga already exists' })

    const newManga = await prisma.manga.create({
      data: {
        title,
        image_url,
        volumes,
        volumesOwned: [],
        myAnimeListID,
        user: {
          connect: {
            UserID: id,
          },
        },
      },
    })

    return res.status(200).send({ manga: newManga })
  } catch (error) {
    res.status(500).send({ error })
  }
}

export const updateManga = async (req: Request, res: Response) => {
  const { volumesOwned, MangaID } = req.body

  if (!volumesOwned)
    return res.status(400).send({ error: 'Missing volumesOwned parameter' })

  try {
    await prisma.manga.update({
      where: {
        MangaID,
      },
      data: {
        volumesOwned,
        updatedAt: new Date(),
      },
    })

    return res.status(200).send({ message: 'Manga updated successfully' })
  } catch (error) {
    res.status(500).send({ error })
  }
}

export const deleteManga = async (req: Request, res: Response) => {
  const { MangaID } = req.body

  if (!MangaID) return res.status(400).send({ error: 'Missing id parameter' })

  try {
    await prisma.manga.delete({
      where: {
        MangaID,
      },
    })

    return res.status(200).send({ message: 'Manga deleted successfully' })
  } catch (error) {
    res.status(500).send({ error })
  }
}
