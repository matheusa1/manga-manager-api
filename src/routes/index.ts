import { Router } from 'express'
import RouterAuth from './Auth/AuthRoutes'
import RouterManga from './Mangas/MangaRoutes'
import RouterUser from './User/UserRoutes'

const router: Router = Router()

router.use('/auth', RouterAuth)
router.use('/manga', RouterManga)
router.use('/user', RouterUser)

export default router
