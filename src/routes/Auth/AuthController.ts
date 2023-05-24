import { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Register = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
  }: {
    name: string
    email: string
    password: string
  } = req.body

  if (!name || !email || !password)
    return res.status(422).send({ error: 'Missing body parameter(s)' })

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user) return res.status(409).send({ error: 'User already exists' })

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    })

    return res.status(201).send({
      message: 'User created',
      user: { id: newUser.UserID, name: newUser.name, email: newUser.email },
    })
  } catch (error: any) {
    return res.status(500).send({ error: error.message })
  }
}

export const Login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body

  if (!email || !password)
    return res.status(422).send({ error: 'Missing body parameter(s)' })
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) return res.status(404).send({ error: 'User not found' })

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid)
      return res.status(401).send({ error: 'Invalid password' })

    const token = jwt.sign(user, 'mangaManager')

    return res.status(200).send({
      user: { id: user.UserID, name: user.name, email: user.email },
      token,
    })
  } catch (error: any) {
    return res.status(500).send({ error: error.message })
  }
}
