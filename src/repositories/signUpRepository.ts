import { AppDataSource } from '../data-source'
import { SignUp } from '../entities/SignUp'

export const signUpRepository = AppDataSource.getRepository(SignUp)