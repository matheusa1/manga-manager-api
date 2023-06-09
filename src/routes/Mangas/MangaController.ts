import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'

export const CreateManga = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { title, image_url, volumes, myAnimeListID } = req.body

  if (!title || !image_url || !volumes || !myAnimeListID)
    return res.status(422).send({ error: 'Missing body parameter' })

  try {
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
      return res.status(409).send({ error: 'Manga already exists' })

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

export const updateMangaVolumesOwned = async (req: Request, res: Response) => {
  const { volumesOwned, MangaID } = req.body

  if (!volumesOwned)
    return res.status(400).send({ error: 'Missing volumesOwned parameter' })

  try {
    const manga = await prisma.manga.findMany({
      where: {
        MangaID,
      },
    })

    if (manga.length < 1)
      return res.status(404).send({ error: 'Manga doesnt exist' })

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
  const MangaID = Number(req.params.MangaID)
  const id = Number(req.params.id)
  if (!MangaID) return res.status(400).send({ error: 'Missing id parameter' })

  try {
    const manga = await prisma.manga.findMany({
      where: {
        myAnimeListID: MangaID,
        user: {
          UserID: id,
        },
      },
    })

    if (manga.length < 1)
      return res.status(404).send({ error: 'Manga doesnt exist' })

    await prisma.manga.delete({
      where: {
        MangaID: manga[0].MangaID,
      },
    })

    return res.status(200).send({ message: 'Manga deleted successfully' })
  } catch (error) {
    res.status(500).send(error)
  }
}

export const updateMangaVolumes = async (req: Request, res: Response) => {
  const { volumes, MangaID } = req.body

  if (!volumes) return res.status(400).send({ error: 'Missing volumes' })

  try {
    await prisma.manga.update({
      where: {
        MangaID,
      },
      data: {
        volumes,
        updatedAt: new Date(),
      },
    })

    return res.status(200).send({ message: 'Manga updated successfully' })
  } catch (error) {
    res.status(500).send({ error })
  }
}
