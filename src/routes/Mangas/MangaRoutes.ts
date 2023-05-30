import { Router } from 'express'
import {
  CreateManga,
  deleteManga,
  updateMangaVolumes,
  updateMangaVolumesOwned,
} from './MangaController'
import checkToken from '../../Helpers/VerifyToken'

const router: Router = Router()

router.post('/:id', checkToken, CreateManga)
router.put('/volumes-owned/:id', checkToken, updateMangaVolumesOwned)
router.delete('/:id/:MangaID', checkToken, deleteManga)
router.put('/volumes/:id', checkToken, updateMangaVolumes)

export default router
