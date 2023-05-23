import { Router } from 'express'
import RouterAuth from './Auth/AuthRoutes'

const router: Router = Router()

router.use('/auth', RouterAuth)

export default router
