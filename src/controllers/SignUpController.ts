import { Request, Response } from 'express'
import { signUpRepository } from '../repositories/signUpRepository'

export class SignUpController {
	async create(req: Request, res: Response) {
		const { name, document, date_birthday, email } = req.body

		try {
			const newRegister = signUpRepository.create({ name, document, date_birthday, email })
			await signUpRepository.save(newRegister)

			return res.status(201).json(newRegister)
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
		}
	}


}