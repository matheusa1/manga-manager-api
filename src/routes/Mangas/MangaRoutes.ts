import { Router } from 'express'
import { CreateManga, updateManga } from './MangaController'
import checkToken from '../../Helpers/VerifyToken'

const router: Router = Router()

router.post('/:id', checkToken, CreateManga)
router.put('/:id', checkToken, updateManga)
router.delete('/:id', checkToken, updateManga)

export default router
