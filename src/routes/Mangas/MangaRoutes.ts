import { Router } from 'express'
import { CreateManga, deleteManga, updateManga } from './MangaController'
import checkToken from '../../Helpers/VerifyToken'

const router: Router = Router()

router.post('/:id', checkToken, CreateManga)
router.put('/:id', checkToken, updateManga)
router.delete('/:id', checkToken, deleteManga)

export default router
