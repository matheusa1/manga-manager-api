import { Router } from 'express'
import { GetMangas } from './UserController'
import checkToken from '../../Helpers/VerifyToken'

const router: Router = Router()

router.get('/mangas/:id', checkToken, GetMangas)

export default router
