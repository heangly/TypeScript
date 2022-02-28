import express, { NextFunction } from 'express'
import 'colors'
import todoRoutes from './routes/todos'

const app = express()

app.use(express.json())

app.use('/todos', todoRoutes)

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    res.status(500)
    res.json({ message: err.message })
  }
)

app.use((_, res: express.Response) => {
  res.status(500)
  res.json({ message: 'all routes' })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`.cyan.underline.bold)
})
