import { Router } from 'express'
import { SignUpController } from './controllers/SignUpController'

const routes = Router()

routes.post('/signup', new SignUpController().create)

export default routes