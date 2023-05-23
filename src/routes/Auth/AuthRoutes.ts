import { Router } from 'express'
import { Login, Register } from './AuthController'

const router: Router = Router()

router.post('/register', Register)
router.post('/login', Login)

export default router
