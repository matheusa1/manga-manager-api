import { Router } from 'express'
import { GetMangas, deleteUser, updateUser } from './UserController'
import checkToken from '../../Helpers/VerifyToken'

const router: Router = Router()

router.get('/mangas/:id', checkToken, GetMangas)
router.delete('/:id', checkToken, deleteUser)
router.put('/:id', checkToken, updateUser)

export default router
