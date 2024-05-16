import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
import { Request, Response } from "express"

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())

	app.use(routes)

//    app.get("/users", (req: Request, res: Response) => {
//       // here we will have logic to return all users
//       return res.json('ok, deu certo!')
//   })

	return app.listen(process.env.PORT)
})